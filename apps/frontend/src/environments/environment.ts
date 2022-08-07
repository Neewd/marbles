// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { WALLET_PROVIDER_DEVNET } from "@elrondnetwork/erdjs-web-wallet-provider";


export const environment = {
  production: false,
  walletConnectBridgeUrl: 'https://bridge.walletconnect.org',
  callbackUrl: 'http://localhost:4200',
  walletProviderUrl: WALLET_PROVIDER_DEVNET
};
