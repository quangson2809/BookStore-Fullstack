# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

set ath: Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

--BE          
2. vào connected service , tạo kết nôi với server localdb và database đã tạo
3.cài và update entity framework core tools.
chạy trên bash các lệnh:
    -dotnet add package Microsoft.EntityFrameworkCore
    -dotnet add package Microsoft.EntityFrameworkCore.SqlServer
    -dotnet add package Microsoft.EntityFrameworkCore.Tools
    -dotnet tool update --global dotnet-ef
    -dotnet tool update --global dotnet-ef
4, build dự án:
    - dotnet build
5, tạo các bảng trong DB 
    - dotnet ef migrations add InitialCreate --project bookstore.Server --startup-project bookstore.Server
6, thêm các trường dữ liệu
    - dotnet build
    - dotnet ef migrations add AddMoreFieldsTo<entity>
    - dotnet ef migrations remove(nếu sai)
    - dotnet ef database update
```5. test ánh xạ Db:
Chạy trong Package Manager Console (PMC)
Vào Visual Studio → menu Tools → NuGet Package Manager → Package Manager Console.
    -Scaffold-DbContext "Data Source=(localdb)\mssqllocaldb;Initial Catalog=BookStoreDB;Integrated Security=True;MultipleActiveResultSets=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Entities -Context BookStoreDbContext -f
```