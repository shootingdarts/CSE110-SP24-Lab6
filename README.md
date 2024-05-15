## David Liu

1) Within a Github action that runs whenever a code is pushed.
    * Because we want to make sure every version of our project passes these tests and is available to deploy.
2) No I wouldn't use e2e to test function outputs.
    * Because functions outputs are usually invisible to the users, so e2e testing would have a hard time testing it.