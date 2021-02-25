# Shipping Address Kata

JavaScript exercise to convert shipping addresses.

## Get set up

`npm ci`

### Run the application

`npm start`

### Run the tests

`npm test`

## Structure

- `/data` Contains json with raw address fields
- `/app` Contains the code that prints out the labels
- `/test` Contains the tests written in Jest

# Task

Implement the ticket below on this project. The address data is already available in the json file.

- Do not change the data in the json file. Treat this as an external data system.
- Fix any bugs you encounter

# Ticket-130

As an international user
I want to recieve your product

_background_
Our business is growing and we now need to print off address information around the world. It has come to the attention of the product that the UK format for address labels is not valid for all countries.

We want to start shipping to the US, Hong Kong, Italy, Switzerland, France, Germany and Japan.

We already have collected the Address information but require a change to display the correct Address.

### Examples:

(from https://bitboost.com/ref/international-address-formats.html)

#### Italy:

CHRIS RUSSO  
VIA APPIA NUOVA 123/4  
00184 ROMA RM  
ITALY  

#### US:

CHRIS NISWANDEE  
SMALLSYS INC  
795 E DRAGRAM  
TUCSON AZ 85705  
USA

#### Switzerland:

Frau  
Wilhemlina Waschbaer  
Hochbaumstrasse 123 A  
5678 Bern  
SWITZERLAND  

#### Hong Kong:

Mr. CHAN Kwok-kwong  
Flat 25, 12/F, Acacia Building  
150 Kennedy Road  
WAN CHAI  
HONG KONG  

#### France:

Madame Duval  
27 RUE PASTEUR  
14390 CABOURG  
FRANCE

#### Germany:

Herrn  
Eberhard Wellhausen  
Wittekindshof  
Schulstrasse 4  
32547 Bad Oyenhausen   
GERMANY

#### Japan:

see https://www.japan-guide.com/e/e2224.html

〒 106-0044  
東京都港区東麻布 1-8-1  
東麻布 IS ビル 4F  

Yagita Asami  
Higashi Azabu IS Bldg 4F  
Higashi Azabu 1-8-1  
Minato-ku Tokyo 106-0044  
