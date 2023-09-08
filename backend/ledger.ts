import {
  Principal,
  $query,
  Vec,
  Tuple,
  text,
  match,
  ic,
  $update,
  Variant,
  nat,
} from 'azle';
import {
  ICRC1Account,
  ICRC,
  ICRC1TransferArgs,
  ICRC1TransferError,
  ICRC2TransferFromArgs,
  ICRC2TransferFromError,
  ICRC1Value,
} from 'azle/canisters/icrc';

// token
const tokenCanister = process.env.CANISTER_ID_ICRC1_LEDGER;
$query;
export function ledgerEnvVar(): string {
  return (
    process.env.CANISTER_ID_ICRC1_LEDGER ??
    'process.env.CANISTER_ID_ICRC1_LEDGER is undefined'
  );
}
const icrc = new ICRC(Principal.fromText(ledgerEnvVar()));

$query;
export async function icrc1_metadata(): Promise<
  Vec<Tuple<[text, ICRC1Value]>>
> {
  const result = await icrc.icrc1_metadata().call();

  return match(result, {
    Ok: (ok) => ok,
    Err: (err) => ic.trap(err),
  });
}

$update;
export async function icrc1_transfer(
  transferArgs: ICRC1TransferArgs,
): Promise<Variant<{ Ok: nat; Err: ICRC1TransferError }>> {
  const result = await icrc.icrc1_transfer(transferArgs).call();

  return match(result, {
    Ok: (ok) => ok,
    Err: (err) => ic.trap(err),
  });
}

$update;
export async function icrc2_transfer(
  transferArgs: ICRC2TransferFromArgs,
): Promise<Variant<{ Ok: nat; Err: ICRC2TransferFromError }>> {
  const result = await icrc.icrc2_transfer_from(transferArgs);

  return match(result, {
    Ok: (ok) => ok,
    Err: (err) => ic.trap(err),
  });
}

$query;
export async function icrc1_balance_of(account: ICRC1Account): Promise<nat> {
  const result = await icrc.icrc1_balance_of(account).call();

  return match(result, {
    Ok: (ok) => ok,
    Err: (err) => ic.trap(err),
  });
}
