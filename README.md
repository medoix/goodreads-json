# goodreads-json

Third party GoodReads API returning JSON instead of XML


## Dev Setup
Create a local .env file with the GoodReads
key=?
secret=?

```
npm install
npm run dev
```

## API Endpoints
Each API endpoint has a normal "Display" URL and then the same ending in /json that returns the results in JSON instead of XML.

### Persons Book Shelfs
Example user: 85150139
Example shelf: to-read, currently-reading, read
```
/reading/user/shelf
/reading/user/shelf/json
```

### Book Details
Example book: 9182923
```
/book/id
/book/id/json
```

### Author Details
Example author: 328437
```
/author/id
/author/id/json
```