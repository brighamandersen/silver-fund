import mysql.connector

mydb = mysql.connector.connect(
    host="localhost", user="root", passwd="root", db="testdb"
)

mycursor = mydb.cursor()

# print(mydb)


#####  DATABASES #####

# mycursor.execute("CREATE DATABASE `testdb`")
# mycursor.execute("DROP DATABASE `test`")

# mycursor.execute("SHOW DATABASES")
# for db in mycursor:
#     print(db)


######  TABLES  ######

# mycursor.execute("CREATE TABLE `testtb` (name VARCHAR(50), age INTEGER(10))")

# mycursor.execute("SHOW TABLES")
# for tb in mycursor:
#     print(tb)

# mycursor.execute('INSERT INTO `testtb` VALUES ("Don", 23)')
# mydb.commit()

# add = "INSERT INTO testtb (name, age) VALUES (%s, %s)"
# newName = ("Mike", 24)
# mycursor.execute(add, newName)
# mydb.commit()

# add = "INSERT INTO testtb (name, age) VALUES (%s, %s)"
# newNames = [
#     ("Tommy", 16),
#     ("Johnny", 13),
#     ("Troy", 34),
# ]
# mycursor.executemany(add, newNames)
# mydb.commit()
