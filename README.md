# LogScribe AI

![LogScribe AI](public/vite.svg)

LogScribe AI is an intelligent web application designed to assist university students with their Student Industrial Work Experience Scheme (SIWES) logbook reporting during internships. The application leverages Google's Generative AI (Gemini) to automatically generate realistic daily logbook entries based on your internship details.

## 🚀 Features

- **AI-Powered Generation**: Uses Google Gemini 2.0 Flash model to generate authentic logbook entries
- **Smart Context Awareness**: Takes into account business type, project details, and student department
- **Structured Output**: Generates properly formatted 5-day weekly entries following standard workweek format
- **History Management**: Saves and retrieves previous form states and generated responses
- **Modal Display**: View historical entries in an elegant modal interface
- **Markdown Support**: Renders generated content with proper formatting
- **Real-time Validation**: Form validation to ensure all required fields are completed
- **Loading States**: Visual feedback during AI content generation

## 🛠️ Technology Stack

- **Frontend**: Svelte 5 with TypeScript
- **Styling**: Bulma CSS Framework with custom SCSS
- **AI Integration**: Google Generative AI (@google/genai)
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Icons**: Tabler Icons for Svelte
- **Markdown**: markdown-it parser

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- Google Gemini API key

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ezek-iel/LogScribeAI.git
   cd LogScribeAI
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your Google Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📖 Usage

1. **Fill in the Form**:
   - **Business Name**: Enter the name of your internship organization
   - **Project Name**: Describe the project you're working on
   - **Student Department**: Your academic department (e.g., Computer Science, Civil Engineering)
   - **Additional Context**: Provide extra details about the business, project week, or specific tasks

2. **Generate Entries**:
   - Click the "Generate" button to create AI-powered logbook entries
   - Wait for the AI to process your information (usually 2-3 seconds)

3. **Review Results**:
   - Generated entries will appear in a structured format
   - Each entry includes day, date, and detailed activities
   - Content is properly formatted with markdown support

4. **History Management**:
   - Previous generations are automatically saved to localStorage
   - Access historical entries through the modal interface

## 🏗️ Project Structure

```
LogScribeAI/
├── src/
│   ├── App.svelte          # Main application component
│   ├── Modal.svelte        # History display modal
│   ├── History.svelte      # History management component
│   ├── utils.ts            # Core utility functions (AI, parsing, storage)
│   ├── prompt.ts           # AI prompt templates and examples
│   ├── app.css             # Global styles
│   ├── override.scss       # Bulma customizations
│   └── main.ts             # Application entry point
├── files/                  # PDF logbook templates
├── public/                 # Static assets
├── package.json            # Project dependencies
├── vite.config.ts          # Vite configuration
├── svelte.config.js        # Svelte configuration
└── tsconfig.json           # TypeScript configuration
```

## 🤖 AI Configuration

The application uses Google's Gemini 2.0 Flash model with:
- **Response Format**: Structured JSON output
- **System Instructions**: Comprehensive prompts with real-world examples
- **Response Schema**: Validated structure for consistent outputs
- **Context Examples**: Multiple industry scenarios (tech, engineering, cybersecurity)

## 💾 Data Management

- **Local Storage**: Form states and history are saved locally
- **Form State Persistence**: Automatically saves current form data
- **History Tracking**: Maintains a complete record of generated entries
- **Data Retrieval**: Easy access to previous sessions and responses

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Loading Indicators**: Visual feedback during AI processing
- **Form Validation**: Real-time validation with clear error states
- **Skeleton Loading**: Placeholder content during generation
- **Modal Interface**: Clean display for historical entries
- **Bulma Integration**: Professional styling with consistent design system

## 🔒 Security Considerations

- API keys are handled through environment variables
- No sensitive data is transmitted to external servers (except Google AI)
- Local storage is used for data persistence
- Form validation prevents malicious input

## 📚 Example Output

```json
{
  "entries": [
    {
      "day": "Monday",
      "date": "2025-01-15",
      "activities": "* Attended morning briefing on project requirements\n* Set up development environment\n* Reviewed existing codebase and documentation"
    },
    {
      "day": "Tuesday", 
      "date": "2025-01-16",
      "activities": "* Implemented user authentication module\n* Conducted code review with senior developer\n* Updated project documentation"
    }
  ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Generative AI for powering the intelligent content generation
- Svelte team for the excellent framework
- Bulma CSS for the clean styling system
- The open-source community for various dependencies

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the documentation
- Review existing issues for solutions

## 🔮 Future Enhancements

- [ ] PDF export functionality
- [ ] Multiple week generation
- [ ] Custom templates
- [ ] Collaboration features
- [ ] Advanced AI prompting
- [ ] Integration with academic systems

---

**Made with ❤️ for SIWES students everywhere**