import { WALLET_PROVIDER_MAINNET } from "@elrondnetwork/erdjs-web-wallet-provider";

export const environment = {
  production: true,
  walletConnectBridgeUrl: 'https://bridge.walletconnect.org',
  callbackUrl: 'https://marbles-tau.vercel.app/',
  walletProviderUrl: WALLET_PROVIDER_MAINNET
};
