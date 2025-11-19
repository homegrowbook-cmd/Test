# Contributing to GrowDiaries 2.0

Thank you for your interest in contributing to GrowDiaries 2.0! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear title and description
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, Node version, etc.)

### Suggesting Features

We love new ideas! To suggest a feature:
- Open an issue with the "feature request" label
- Describe the feature and its use case
- Explain why it would be valuable
- Provide examples if possible

### Code Contributions

1. **Fork the repository**

2. **Clone your fork**
```bash
git clone https://github.com/your-username/Test.git
cd Test
```

3. **Create a feature branch**
```bash
git checkout -b feature/your-feature-name
```

4. **Set up the development environment**
```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run prisma:generate
npm run prisma:migrate

# Frontend
cd ../frontend
npm install
cp .env.example .env.local
```

5. **Make your changes**
- Write clean, readable code
- Follow the existing code style
- Add comments where necessary
- Update documentation if needed

6. **Test your changes**
```bash
# Backend
cd backend
npm test
npm run lint

# Frontend
cd frontend
npm run build
npm run lint
```

7. **Commit your changes**
```bash
git add .
git commit -m "feat: add amazing new feature"
```

Use conventional commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

8. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

9. **Create a Pull Request**
- Go to the original repository
- Click "New Pull Request"
- Select your branch
- Fill in the PR template
- Submit!

## Development Guidelines

### Code Style

**Backend (NestJS)**
- Use TypeScript
- Follow NestJS best practices
- Use dependency injection
- Write unit tests for services
- Use DTOs for validation
- Add Swagger decorators to controllers

**Frontend (Next.js)**
- Use TypeScript
- Use functional components with hooks
- Use TailwindCSS for styling
- Keep components small and focused
- Use proper TypeScript types

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Example:
```
feat(runs): add search functionality

Add ability to search runs by strain name, user, or description.
Includes pagination and filtering options.

Closes #123
```

### Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the documentation in the `docs/` folder
3. The PR will be merged once it has been reviewed and approved
4. Make sure all tests pass
5. Ensure the code follows the project's style guidelines

### Testing

- Write tests for new features
- Ensure all existing tests pass
- Aim for good test coverage
- Test edge cases

### Documentation

- Update relevant documentation
- Add JSDoc comments to functions
- Update API documentation if endpoints change
- Add examples where helpful

## Community

- Be respectful and inclusive
- Help others when you can
- Provide constructive feedback
- Follow our Code of Conduct

## Questions?

If you have questions, feel free to:
- Open an issue with the "question" label
- Ask in discussions
- Reach out to the maintainers

## Recognition

Contributors will be recognized in:
- The project README
- Release notes
- The contributors page

Thank you for contributing to GrowDiaries 2.0! 🌿
