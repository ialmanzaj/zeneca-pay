import { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { TransactionExecutionError } from 'viem';
import {
    useAccount,

} from 'wagmi';
import { Button } from '@/components/ui/button';
import { EXPECTED_CHAIN } from '@/constants';
import PaymentComplete from './PaymentComplete';
import Processing from './Processing';
import { PaySteps } from './PayFlow';
import { useUSDCContract } from '../_contracts/useUSDC';
import { encodeFunctionData, parseAbiItem, Hex } from "viem";
import { useWriteContracts, useCallsStatus, useCapabilities } from 'wagmi/experimental'
import { v4 as uuidv4 } from 'uuid';

interface PaymentLink {
    id: string;
    link: string;
    currency: string;
    amount: number;
    title: string;
    description?: string;
    merchantName: string;
}


type StartPayProps = {
    setPayStep: React.Dispatch<React.SetStateAction<PaySteps>>;
    payStep: PaySteps;
    paymentLink: PaymentLink;
};



const defaultUrl = process.env.NEXT_PUBLIC_PAYMASTER_URL
const idempotencyKey = uuidv4();

export default function Pay({ setPayStep, payStep, paymentLink }: StartPayProps) {
    console.log("paymentLink", paymentLink);
    const { address } = useAccount();
    const { data: callID, writeContracts } = useWriteContracts();
    const [amount, setAmount] = useState('1');
    const [merchantAddress, setMerchantAddress] = useState('0x02C48c159FDfc1fC18BA0323D67061dE1dEA329F');
    const [transactionSubmitted, setTransactionSubmitted] = useState(false);

    const contract = useUSDCContract();

    const { data: callsStatus } = useCallsStatus({
        id: callID!,
        query: {
            refetchInterval: (data: any) =>
                data.state.data?.status === 'CONFIRMED' ? false : 1000,
        },
    });

    console.log(callsStatus?.receipts);


    const submitTransaction = useCallback(() => {
        if (transactionSubmitted) return;

        fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: paymentLink.amount,
                currency: paymentLink.currency,
                merchantAddress: merchantAddress,
                customerAddress: address,
                paymentLinkId: paymentLink.id,
                idempotencyKey: uuidv4(), // Generate a new UUID for each submission attempt
            }),
        }).then(() => {
            setTransactionSubmitted(true);
        });
    }, [paymentLink, merchantAddress, address, transactionSubmitted]);

    useEffect(() => {
        if (callsStatus?.status === 'CONFIRMED') {
            submitTransaction();
        }
    }, [callsStatus, submitTransaction]);

    if (contract.status !== 'ready') {
        console.error('Contract is not ready');
        return null;
    }


    const handleTransfer = () => {
        writeContracts({
            contracts: [
                {
                    address: contract.address, // Sepolia USDC address
                    abi: contract.abi,
                    functionName: 'transfer',
                    args: [merchantAddress, BigInt(amount) * BigInt(10 ** 6)], // Convert to USDC decimals (6)
                },
            ],
            capabilities: {
                paymasterService: {
                    url: defaultUrl,
                },
            },
        });
    };

    return (
        <>
            {callsStatus?.status === 'PENDING' && <Processing />}
            {callsStatus?.status === 'CONFIRMED' && (
                <PaymentComplete setPayStep={setPayStep} merchantName={paymentLink.merchantName} />
            )}

            {callsStatus?.status !== 'CONFIRMED' && callsStatus?.status !== 'PENDING' && (
                <Button
                    onClick={handleTransfer}
                    className={clsx('w-full my-4')}
                >
                    Pay
                </Button>
            )}
        </>
    );
}