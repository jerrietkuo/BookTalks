const { Book } = require('../models');

const Bookdata = [
    {
      "title": "The Hobbit",
      "author": "J.R.R. Tolkien",
      "description": "A hobbit embarks on a journey to reclaim a lost kingdom.",
      "Bookshelf_id": 1
    },
    {
      "title": "Harry Potter and the Sorcerer's Stone",
      "author": "J.K. Rowling",
      "description": "A young wizard begins his magical education.",
      "Bookshelf_id": 1
    },
    {
      "title": "Treasure Island",
      "author": "Robert Louis Stevenson",
      "description": "A young boy finds a treasure map and sets off on a quest.",
      "Bookshelf_id": 2
    },
    {
      "title": "The Three Musketeers",
      "author": "Alexandre Dumas",
      "description": "Dashing swordsmen fight for honor and adventure.",
      "Bookshelf_id": 2
    },
    {
      "title": "Dracula",
      "author": "Bram Stoker",
      "description": "A vampire terrorizes a group of people.",
      "Bookshelf_id": 3
    },
    {
      "title": "Frankenstein",
      "author": "Mary Shelley",
      "description": "A scientist creates a monster with tragic results.",
      "Bookshelf_id": 3
    },
    {
      "title": "Dune",
      "author": "Frank Herbert",
      "description": "A young nobleman battles for control of a desert planet.",
      "Bookshelf_id": 4
    },
    {
      "title": "Ender's Game",
      "author": "Orson Scott Card",
      "description": "A boy trains to fight in an interstellar war.",
      "Bookshelf_id": 4
    },
    {
      "title": "Pride and Prejudice",
      "author": "Jane Austen",
      "description": "A woman navigates love and social expectations.",
      "Bookshelf_id": 5
    },
    {
      "title": "Gone with the Wind",
      "author": "Margaret Mitchell",
      "description": "A woman struggles through love and war in the South.",
      "Bookshelf_id": 5
    },
    {
      "title": "The Da Vinci Code",
      "author": "Dan Brown",
      "description": "A symbologist uncovers secrets of a religious order.",
      "Bookshelf_id": 6
    },
    {
      "title": "Gone Girl",
      "author": "Gillian Flynn",
      "description": "A woman disappears, and her husband is the prime suspect.",
      "Bookshelf_id": 6
    },
    {
      "title": "1984",
      "author": "George Orwell",
      "description": "A man struggles in a totalitarian society.",
      "Bookshelf_id": 7
    },
    {
      "title": "The Handmaid's Tale",
      "author": "Margaret Atwood",
      "description": "A woman lives in a dystopian society where women are property.",
      "Bookshelf_id": 7
    },
    {
      "title": "The Girl with the Dragon Tattoo",
      "author": "Stieg Larsson",
      "description": "A journalist and a hacker investigate a disappearance.",
      "Bookshelf_id": 8
    },
    {
      "title": "Sherlock Holmes: The Complete Novels and Stories",
      "author": "Arthur Conan Doyle",
      "description": "A detective solves mysteries in Victorian London.",
      "Bookshelf_id": 8
    },
    {
      "title": "All the Light We Cannot See",
      "author": "Anthony Doerr",
      "description": "A blind French girl and a German boy navigate WWII.",
      "Bookshelf_id": 9
    },
    {
      "title": "The Book Thief",
      "author": "Markus Zusak",
      "description": "A young girl steals books in Nazi Germany.",
      "Bookshelf_id": 9
    },
    {
      "title": "The Diary of a Young Girl",
      "author": "Anne Frank",
      "description": "A Jewish girl hides from the Nazis during WWII.",
      "Bookshelf_id": 10
    },
    {
      "title": "Steve Jobs",
      "author": "Walter Isaacson",
      "description": "The life story of Apple's co-founder.",
      "Bookshelf_id": 10
    },
    {
      "title": "The Name of the Wind",
      "author": "Patrick Rothfuss",
      "description": "A gifted young man becomes a legend.",
      "Bookshelf_id": 1
    },
    {
      "title": "A Game of Thrones",
      "author": "George R.R. Martin",
      "description": "Noble families vie for control of the Iron Throne.",
      "Bookshelf_id": 1
    },
    {
      "title": "Moby-Dick",
      "author": "Herman Melville",
      "description": "A captain hunts a giant white whale.",
      "Bookshelf_id": 2
    },
    {
      "title": "The Odyssey",
      "author": "Homer",
      "description": "An epic journey of a hero returning home.",
      "Bookshelf_id": 2
    },
    {
      "title": "The Shining",
      "author": "Stephen King",
      "description": "A haunted hotel drives a man insane.",
      "Bookshelf_id": 3
    },
    {
      "title": "The Haunting of Hill House",
      "author": "Shirley Jackson",
      "description": "A group investigates a haunted mansion.",
      "Bookshelf_id": 3
    },
    {
      "title": "Neuromancer",
      "author": "William Gibson",
      "description": "A washed-up computer hacker is hired for a final job.",
      "Bookshelf_id": 4
    },
    {
      "title": "Snow Crash",
      "author": "Neal Stephenson",
      "description": "A computer virus threatens a dystopian future.",
      "Bookshelf_id": 4
    },
    {
      "title": "Jane Eyre",
      "author": "Charlotte Brontë",
      "description": "An orphaned governess finds love and secrets.",
      "Bookshelf_id": 5
    },
    {
      "title": "Outlander",
      "author": "Diana Gabaldon",
      "description": "A WWII nurse is transported back to 18th-century Scotland.",
      "Bookshelf_id": 5
    },
    {
      "title": "The Girl on the Train",
      "author": "Paula Hawkins",
      "description": "A woman becomes entangled in a missing persons investigation.",
      "Bookshelf_id": 6
    },
    {
      "title": "The Silence of the Lambs",
      "author": "Thomas Harris",
      "description": "An FBI trainee seeks help from a cannibalistic serial killer.",
      "Bookshelf_id": 6
    },
    {
      "title": "Brave New World",
      "author": "Aldous Huxley",
      "description": "A dystopian future of genetically modified citizens.",
      "Bookshelf_id": 7
    },
    {
      "title": "Fahrenheit 451",
      "author": "Ray Bradbury",
      "description": "A fireman who burns books begins to question his role.",
      "Bookshelf_id": 7
    },
    {
      "title": "The Maltese Falcon",
      "author": "Dashiell Hammett",
      "description": "A private detective searches for a valuable statue.",
      "Bookshelf_id": 8
    },
    {
      "title": "Big Little Lies",
      "author": "Liane Moriarty",
      "description": "The lives of three women unravel around a murder mystery.",
      "Bookshelf_id": 8
    },
    {
      "title": "The Nightingale",
      "author": "Kristin Hannah",
      "description": "Two sisters in Nazi-occupied France endure hardship and heartbreak.",
      "Bookshelf_id": 9
    },
    {
      "title": "War and Peace",
      "author": "Leo Tolstoy",
      "description": "A historical epic set during the Napoleonic Wars.",
      "Bookshelf_id": 9
    },
    {
      "title": "Becoming",
      "author": "Michelle Obama",
      "description": "The memoir of the former First Lady of the United States.",
      "Bookshelf_id": 10
    },
    {
      "title": "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
      "author": "Ashlee Vance",
      "description": "The life and achievements of Elon Musk.",
      "Bookshelf_id": 10
    },
];

const seedBooks = () => Book.bulkCreate(Bookdata);

module.exports = seedBooks;
