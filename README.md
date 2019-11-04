Live build can be found at https://holdahl-react-calculator.herokuapp.com/

To run:
    Download from https://github.com/aholdahl/react-calculator and upzip
    Type the following commands into Terminal:
        npm install
        npm run server
        cmd+t
        npm run client


# Objective

Build a calculator that captures an equation provided by the user. (Ex: 5+5)
Upon submit, the calculator will log the result below the calculator (ex: 5+5=10)
All active users are able to see the results immediately.
All users' results appear in the list, most recent on top, up to 10.

Results should remain between sessions.

# Questions

Does the calculator need to be able to handle more complex equations? (ex: 5 + 4 * 9)
Does the calculator need to be able to handle the input of negative numbers into the equation? (-7 + 3)
Used eval() for dryness - do we need to rewrite it for security purposes?