## Description

# 🍔 FoodHub API

FoodHub API is a complete backend service for powering a modern food marketplace platform.  
It provides **robust CRUD endpoints** for users, products, categories, carts, orders, favorites, payments, and delivery, with support for reports and admin management.  

---

## 🚀 Features

### 👤 User Management
- Register, login, and authentication with token-based security.
- Update profile and manage account settings.

### 📦 Products & Categories
- CRUD for products (add, update, list, delete).
- Manage product categories with soft delete and validation.
- Upload product images and associate nutrition details.

### 🛒 Cart & Favorites
- Add, update, remove, and list cart items.
- Add/remove favorites.
- View favorite items.

### 📑 Orders
- Place new orders with validation for payment, promo codes, and delivery.
- Cancel or confirm orders.
- View order history and detailed order breakdowns.
- Admin APIs to manage order statuses (new, completed, cancelled, declined).

### 💳 Payments
- Add, remove, and list payment methods.
- Retrieve payment details for checkout.
- Integrate confirm payment flow.

### 🚚 Delivery
- Add, update, mark default, and list delivery addresses.
- Generate delivery reports.
- Track status updates for deliveries.

### 🔔 Notifications & Reports
- Order-based notifications with read/unread tracking.
- Generate delivery and transaction reports.

---

## 🛠️ Tech Stack

- **NestJS** – Modular Node.js framework.
- **Prisma** – Type-safe ORM for database interaction.
- **PostgreSQL/MySQL** – Relational database support.
- **JWT Authentication** – Secure user sessions.
- **Multer** – For image/file uploads.
- **Docker** (optional) – Containerized deployment.

---

## 📂 Project Structure

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
