A simple currency tracker discord bot

To setup and run:
```
$ npm i
$ node .
```

## Supported Commands
### Normal
- `/balance` Retrieve the user's balance
- `/add [amount]` Add the given amount to the user's balance
- `/set [balance]` Change the user's balance to the given amount
### Admin
- `/balance-for-user [user]` Retrieve the balance for a given user
- `/add-for-user [user] [amount]` Add an amount to the given user's balance
- `/set-for-user [user] [balance]` Change the given user's balance to the given amount
