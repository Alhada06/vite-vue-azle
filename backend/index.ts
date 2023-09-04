import {
  $query,
  $update,
  Opt,
  Principal,
  Vec,
  nat,
  ic,
  Variant,
  Result,
  nat64,
} from 'azle';
import {
  insertUser,
  getById,
  allUsers,
  constainsId,
  User,
} from './user_accounts';
import { icrc1_balance_of, icrc1_transfer } from './ledger';
import {
  ICRC1Account,
  ICRC1TransferArgs,
  ICRC1TransferError,
} from 'azle/canisters/icrc/icrc_1';
import { Address, Tokens, TransferResult } from 'azle/canisters/ledger';

export { icrc1_balance_of, icrc1_transfer } from './ledger';
// This is a global variable that is stored on the heap
let counter: nat = BigInt(0);
$query;
export function caller(): Principal {
  return ic.caller();
}
// Query calls complete quickly because they do not go through consensus
$query;
export function get(): nat {
  return counter;
}

// Update calls take a few seconds to complete
// This is because they persist state changes and go through consensus
$update;
export function add(n: nat): nat {
  counter += n; //
  return counter;
}

$update;
export function inc(): nat {
  counter += BigInt(1);
  return counter;
}

$query;
export function getUserById(id: Principal): Opt<User> {
  return getById(id);
}

$query;
export function getAllUsers(): Vec<User> {
  return allUsers();
}

$update;
export function createUser(username: string, id: Principal): Opt<User> {
  return insertUser(username, id);
}
$query;
export function isRegistered(id: Principal): boolean {
  return constainsId(id);
}

$update;
export function updateMyProfile(username: string): Opt<User> {
  return createUser(username, caller());
}
$query;

export function callerIsRegistered(): boolean {
  return isRegistered(caller());
}
$query;

export function callerProfile(): Opt<User> {
  return getUserById(caller());
}

// $query;
// export async function callerBalance(
//   account: Principal,
// ): Promise<Result<Tokens, string>> {
//   return await getAccountBalance(getAddressFromPrincipal(account));
// }

// $update;

// export async function transferTokens(
//   to: Principal,
//   amount: nat64,
//   fee: nat64,
//   createdAtTime: Opt<nat64>,
// ): Promise<Result<TransferResult, string>> {
//   return await executeTransfer(
//     getAddressFromPrincipal(to),
//     amount,
//     fee,
//     createdAtTime,
//   );
// }
