API Documentation  
=================

>**Fetch JSON array of available categories**

```sh
/getCategories
```


**Usage** : http://localhost/getCategories  
**Output** :
```sh
 [{"id":4,"categ_name":"aptitude"},{"id":2,"categ_name":"electronics"},{"id":3,"categ_name":"science"},{"id":1,"categ_name":"test"}]
```

>**Fetch Questions from a Category as given by categoryId**

```sh
/quizQuestionsByCategory/:categoryId
```



**Usage** : http://localhost/quizQuestionsByCategory/3

**Output** :
```sh
[{"id":1,"trivia_categories_id":3,"question":"Which of the following best describes Uranium ?","choices":"Heavy Metal|Organic Compund|Radioactive|Inert Gas","answer":"3","tags":"Science, Math, Knowledge","date_created":"2015-03-22T16:29:31.000Z"}] ```

```

>**Fetch JSON Array of Quiz Questions**

```sh
/allQuizQuestions
```

**Usage** : http://localhost/allQuizQuestions
the above call is equivaltent to  http://localhost/allQuizQuestions?page=1&limit=10

**Output** :
```sh
[{"id":1,"trivia_categories_id":3,"question":"Which of the following best describes Uranium ?","choices":"Heavy Metal|Organic Compund|Radioactive|Inert Gas","answer":"3","tags":"Science, Math, Knowledge","date_created":"2015-03-22T16:29:31.000Z"},{"id":2,"trivia_categories_id":4,"question":"In a given test by prof. virus raju gets 32% marks and fails by 20 marks. Chaturbhuj gets 30 marks more than passing marks while scoring 42%. Marks required to get twice the passing marks are ?","choices":"1000|360|180|1200","answer":"2","tags":"aptitude","date_created":"2015-03-22T16:52:19.000Z"},{"id":3,"trivia_categories_id":4,"question":"Assume that equal number of people are born each day of the year. If the century under consideration is 20th century, what is the % of people born on 29th feb ?\r\n[assume no deaths]","choices":"0.685|0.0685|0.684|0.0684","answer":"4","tags":"","date_created":"2015-03-22T17:05:46.000Z"},{"id":4,"trivia_categories_id":4,"question":"There were 'p' pigeons and 's' sparrows in a cage. One fine morning 'm' birds escaped to freedom. If the caretaker was able to figure out by only looking( not counting) into the cage that at least one pigeon had escaped 7, based on the knowledge that m=7, then which of the following can not be the values of the number of sparrows and pigeons ?","choices":"8 and 10|4 and 12|6 and 25|2 and 7","answer":"1","tags":"","date_created":"2015-03-22T17:10:30.000Z"},{"id":5,"trivia_categories_id":4,"question":"A can do a work in 15 days and B in 20 days. If they work on it together for 4 days, then the fraction of the work that is left is :","choices":"1/4|1/10|7/15|8/15","answer":"4","tags":"","date_created":"2015-03-22T17:20:25.000Z"},{"id":6,"trivia_categories_id":4,"question":" A, B and C can do a piece of work in 20, 30 and 60 days respectively. In how many days can A do the work if he is assisted by B and C on every third day?\r\n","choices":"12 days |15 days|16 days|18 days","answer":"2","tags":"","date_created":"2015-03-22T17:21:35.000Z"},{"id":7,"trivia_categories_id":4,"question":"A alone can do a piece of work in 6 days and B alone in 8 days. A and B undertook to do it for Rs. 3200. With the help of C, they completed the work in 3 days. How much is to be paid to C? ","choices":"rs 300|rs 400|rs 500|rs 600","answer":"2","tags":"","date_created":"2015-03-22T17:24:21.000Z"},{"id":8,"trivia_categories_id":2,"question":"If 60 J of energy are available for every 15 C of charge, what is the voltage?","choices":"4|60|0.25|15","answer":"1","tags":"","date_created":"2015-03-23T02:58:26.000Z"},{"id":9,"trivia_categories_id":2,"question":"Batteries differ from fuel cells in that","choices":"a battery uses hydrogen and oxygen to create electricity|a battery uses a polymer electrolyte membrane |a battery is a closed system|none of these ","answer":"3","tags":"","date_created":"2015-03-23T03:01:24.000Z"},{"id":10,"trivia_categories_id":2,"question":"A digital multiplexer is basically a combination logic circuit to perform which of the following operations:","choices":"NAND-NAND|OR-OR|OR-AND|NOR-NOR","answer":"1","tags":"","date_created":"2015-03-25T16:21:23.000Z"}]
```


>**Fetch JSON Array of all Questions , speciffy limits and pagenumber for pagination**

```sh
/allQuizQuestions?page=x&limit=y
```


**Usage** : http://localhost/allQuizQuestions?page=1&limit=3

**Output** :
```sh
[{"id":1,"trivia_categories_id":3,"question":"Which of the following best describes Uranium ?","choices":"Heavy Metal|Organic Compund|Radioactive|Inert Gas","answer":"3","tags":"Science, Math, Knowledge","date_created":"2015-03-22T16:29:31.000Z"},{"id":2,"trivia_categories_id":4,"question":"In a given test by prof. virus raju gets 32% marks and fails by 20 marks. Chaturbhuj gets 30 marks more than passing marks while scoring 42%. Marks required to get twice the passing marks are ?","choices":"1000|360|180|1200","answer":"2","tags":"aptitude","date_created":"2015-03-22T16:52:19.000Z"},{"id":3,"trivia_categories_id":4,"question":"Assume that equal number of people are born each day of the year. If the century under consideration is 20th century, what is the % of people born on 29th feb ?\r\n[assume no deaths]","choices":"0.685|0.0685|0.684|0.0684","answer":"4","tags":"","date_created":"2015-03-22T17:05:46.000Z"}]```