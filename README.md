Visualize stock trends to time sell
=====================

Most portfolio apps show the current stock price, bought price and total profit/loss. You need to click somewhere else to see how the stock price is trending.

This is not very helpful if you own a number of stocks and want to just see the trend of each scrip, without having to memorize the buy-price.

This app helps you see the 5 day, 3 month and 1 year stock price trend (thanks for Yahoo Finance), while keeping your buy price right in the middle of the chart. So you don't have to memorize it while you watch the trends for all the stocks you own.

To run the app, you will need to specify your scrips in the data/data.json file (sample below)
e.g
````JSON
[
  {
        "scrip":"AAPL",
        "buyPrice":"95.00"
    },
    {
        "scrip":"GOOGL",
        "buyPrice":"500.00"
    }
]
````

Change directory to where index.html is located and run a HTTP Server to serve the app.
On a Mac, you can do this simply by
```
python -m SimpleHTTPServer
```

Feel free to send me your comments.

