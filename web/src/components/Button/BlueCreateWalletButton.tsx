import React, { useCallback } from 'react';
import { useConnect } from 'wagmi';
//import { CoinbaseWalletLogo } from './CoinbaseWalletLogo';

const buttonStyles = {
    background: 'transparent',
    border: '1px solid transparent',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 200,
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor: '#5A10EF',
    paddingLeft: 15,
    paddingRight: 30,
    borderRadius: 10,
};

export default function BlueCreateWalletButton() {
    const { connectors, connect, data } = useConnect();

    const createWallet = useCallback(() => {
        const coinbaseWalletConnector = connectors.find(
            (connector) => connector.id === 'coinbaseWalletSDK'
        );
        if (coinbaseWalletConnector) {
            connect({ connector: coinbaseWalletConnector });
        }
    }, [connectors, connect]);
    return (
        <button style={buttonStyles} onClick={createWallet}>
            Create Wallet
        </button>
    );
}