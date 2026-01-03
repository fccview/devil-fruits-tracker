# One Piece Devil Fruit Tracker

## Support the Project

This project is open source and completely free to use. If you find it helpful, please consider supporting its development by contributing to the codebase, curating the data or simply giving a small donation:

<div align="center">
 <a href="https://www.buymeacoffee.com/fccview">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy me a coffee" width="120">
  </a>
</div>

## About

A comprehensive tracker for One Piece Devil Fruits that allows you to:
- View devil fruits by chapter/episode number
- Search and filter fruits by various criteria
- Avoid spoilers based on your reading/watching progress
- See detailed information about each fruit and its users

## Features

- **Progressive Content Reveal**: Only see information up to where you've read/watched
- **Dual Mode**: Switch between manga chapters and anime episodes
- **Advanced Search**: Filter by fruit type, name, or current owner
- **Spoiler Protection**: Carefully curated data to prevent spoilers
- **Responsive Design**: Works great on both desktop and mobile
- **Arc-based Filtering**: Filter fruits based on major story arcs

## Requirements

- Node 20+
- Yarn

## Getting Started

1. Clone the repository:
```bash
git clone git@github.com:fccview/devil-fruits-tracker.git
```

2. Install dependencies:
```bash
cd devil-fruits-tracker
yarn install
```

3. Add your MongoDB URI to `.env.local`:
```
MONGODB_URI=<your_mongodb_uri_here>
LATEST_CHAPTER=<latest_chapter_number>
LATEST_EPISODE=<latest_episode_number>
```

4. Populate the database and download latest images:
```bash
yarn populate:fruits
yarn populate:owners
yarn download:images
```

5. Run the development server:
```bash
yarn dev
```

## Database Setup

The project uses MongoDB to store devil fruit and owner data. To populate your database:

1. Ensure your MongoDB instance is running
2. Check the data files in `scripts/data/`:
   - `fruits.json`: Devil fruit information
   - `owners.json`: Character information
3. Run the population scripts:
```bash
yarn populate:fruits  # Populates devil fruits collection
yarn populate:owners  # Populates owners collection
```

## Contributing

We welcome contributions! Here's how you can help:

### Data Curation

The most valuable way to contribute is by helping maintain accurate spoiler data:

1. Check the `spoilers` array in fruit entries
2. Verify chapter/episode numbers for reveals
3. Ensure previous values are accurate
4. Submit PRs with corrections

### Spoiler Format

Each fruit entry can have multiple spoiler thresholds:

```json
{
  "spoilers": [
    {
      "threshold": {
        "chapter": 744,
        "episode": 678
      },
      "previousValues": {
        "description": "Pre-reveal description",
        ...
      }
    }
  ]
}
```

### Code Contributions

Please ensure your PR:
- Follows the existing code style
- Updates documentation as needed
- Maintains spoiler protection

## Acknowledgments

- Background artwork by [zzyzzyy](https://zzyzzyy.deviantart.com/)
- Code by [fccview](https://fccview.dev)
- All One Piece content and images are property of their respective owners