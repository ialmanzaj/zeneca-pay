'use client';

import dynamic from 'next/dynamic';

import Footer from '@/components/footer';
import Header from '@/components/header';
import Main from '@/components/main';
import { FC } from 'react';

// Because the mint page relies so heavily on client-side state, without disabling SSR
// for its internals we get annoying hydration errors. A future enhancement would be to
// read token metadata through a provider that is available server-side.
const PayDemo = dynamic(
    async () => import('@/app/pay/_components/PayDemo').then((mod) => mod),
    {
        ssr: false,
    },
);


interface PaymentLink {
    id: string;
    link: string;
    currency: string;
    amount: number;
    title: string;
    description?: string;
    collectFullName: boolean;
    collectEmail: boolean;
    collectAddress: boolean;
    collectPhoneNumber: boolean;
    createdAt: string;
}

const PayPage: FC<{ params: { id: string } }> = ({ params }) => {
    return (
        <Main>
            <PayDemo />
        </Main>
    );
}
export default PayPage;




