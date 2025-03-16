# One Piece Devil Fruit Tracker

<div align="center">

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-orange.svg)](https://www.buymeacoffee.com/yourname)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

## Support the Project

This project is open source and completely free to use. If you find it helpful, please consider supportin  its development:

<div align="center">
  <a href="https://www.buymeacoffee.com/fccview">
    <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=yourname&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" />
  </a>
  <br /><br />
</div>

Your support helps maintain and improve this project! 🙏

## 📖 About

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

## 🛠 Tech Stack
- Next.js 14 (App Router)
- TypeScript
- MongoDB
- TailwindCSS
- Vercel (Deployment)

## 💻 Getting Started

1. Clone the repository:
```bash
git clone git@github.com:fccview/devil-fruits-tracker.git
```

2. Install dependencies:
```bash
cd devil-fruits-tracker
yarn install
```

3. Set up your environment variables:
```bash
cp .env.example .env.local
```

4. Add your MongoDB URI to `.env.local`:
```
MONGODB_URI=your_mongodb_uri_here
```

5. Populate the database and download latest images:
```bash
yarn populate:fruits
yarn populate:owners
yarn download:images
```

6. Run the development server:
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

## 🤝 Contributing

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

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Submit a pull request

Please ensure your PR:
- Follows the existing code style
- Includes relevant tests
- Updates documentation as needed
- Maintains spoiler protection

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Background artwork by [zzyzzyy](https://zzyzzyy.deviantart.com/)
- Code by [fccview](https://fccview.dev)
- All One Piece content and images are property of their respective owners

---

<div align="center">
  Made with ❤️ by <a href="https://fccview.dev">fccview</a>
</div>