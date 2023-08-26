import {
  Opt,
  $query,
  Record,
  $update,
  Vec,
  ic,
  Principal,
  StableBTreeMap,
} from 'azle';

export type User = Record<{
  id: Principal;
  username: string;
}>;

let users = new StableBTreeMap<Principal, User>(0, 100, 10_00);

$query;
export function getById(id: Principal): Opt<User> {
  return users.get(id);
}
$query;
export function constainsId(id: Principal): boolean {
  return users.containsKey(id);
}

$query;
export function allUsers(): Vec<User> {
  return users.values();
}

$update;
export function insertUser(username: string, id: Principal): Opt<User> {
  const user = {
    id,
    username,
  };

  return users.insert(id, user);
}
