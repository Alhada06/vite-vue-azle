# Change the variable to "ic" to deploy the ledger on the mainnet.
export NETWORK=local

# Change the variable to the principal that can mint and burn tokens.
DAO_BACKEND="bkyz2-fmaaa-aaaaa-qaaaq-cai"
export MINTER_PRINCIPAL=$DAO_BACKEND

# Change the variable to the principal that controls archive canisters.
export ARCHIVE_CONTROLLER=$(dfx identity get-principal)

export TOKEN_NAME="EXP"
export TOKEN_SYMBOL=EXP

dfx deploy --network ${NETWORK} icrc1-ledger --argument '(variant { Init = 
      record {
        token_name = "'${TOKEN_NAME}'";
        token_symbol = "'${TOKEN_SYMBOL}'";
        minting_account = record { owner = principal "'${MINTER_PRINCIPAL}'";};
        initial_balances = vec {};
        metadata = vec {};
        transfer_fee = 10;
        archive_options = record {
          trigger_threshold = 2000;
          num_blocks_to_archive = 1000;
          controller_id = principal "'${ARCHIVE_CONTROLLER}'";
        }
}})'