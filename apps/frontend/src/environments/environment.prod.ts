import { WALLET_PROVIDER_MAINNET } from "@elrondnetwork/erdjs-web-wallet-provider";

export const environment = {
  production: true,
  walletConnectBridgeUrl: 'https://bridge.walletconnect.org',
  callbackUrl: 'http://localhost:4200',
  walletProviderUrl: WALLET_PROVIDER_MAINNET
};
