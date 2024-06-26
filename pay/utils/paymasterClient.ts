import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import { paymasterActionsEip7677 } from "permissionless/experimental";
import { createClient, http, createPublicClient } from "viem";
import { EXPECTED_CHAIN } from "@/constants";

const paymasterService = process.env.NEXT_PUBLIC_PAYMASTER_URL ?? "";

export const client = createPublicClient({
  chain: EXPECTED_CHAIN,
  transport: http(),
});

export const paymasterClient = createClient({
  chain: EXPECTED_CHAIN,
  transport: http(paymasterService),
});
