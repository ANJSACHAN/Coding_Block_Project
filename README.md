# Event-Driven Scalable Data Processing System

## Introduction
This project implements a scalable and resilient **event-driven system** for processing high-throughput real-time data streams using **RabbitMQ, MongoDB, Redis, GraphQL, Prometheus, Loki, and Grafana**. It features **four producers and four consumers**, ensuring fault tolerance, monitoring, and caching to enhance performance and reliability. The system is designed for high efficiency, leveraging **Redis caching** to store frequently accessed data and reduce database queries. Additionally, **GraphQL optimizes** data fetching, ensuring **minimal latency and improved performance**. The system is **fully containerized** with Docker, making it ready for Kubernetes (K8s) integration in the future.

---

## Assessment Problem Statement
### Challenge:
Design and implement a resilient event-processing system capable of handling high-throughput real-time data streams while maintaining data integrity and performance.

## System Architecture
🚀 Below is a high-level architecture diagram representing the system's event-driven data flow.
<img width="788" alt="Untitled" src="https://github.com/user-attachments/assets/a6314ae9-6d3c-4670-833c-f8c8c16ba6af" />


### Key Requirements & How Our System Fulfills Them:

1. **Scalable Event Ingestion Pipeline**
   ![RabbitMQ](https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white)
   - We use **RabbitMQ** ([Official Docs](https://www.rabbitmq.com/tutorials)) as a message broker to efficiently ingest data from **four different producers**.
   - Each producer sends data to RabbitMQ, which distributes messages to available consumers.
   - **Scalability:** RabbitMQ queues and load balancing ensure smooth data ingestion under high traffic.

3. **Reliable Event Processing with Error Handling**
   ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
   - Consumers process messages and store them in **MongoDB**.
   - **Fault Tolerance:** If a consumer fails, messages are re-queued using:
     ```js
     channel.nack(msg, false, true);
     ```
     This ensures that messages are not lost and are retried in case of failure.
   - **Acknowledgment:** Once successfully processed, messages are acknowledged:
     ```js
     channel.ack(msg);
     ```

5. **Queryable API for Processed Data**
   ![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
   - Implemented a **GraphQL API** ([Official Docs](https://graphql.org/faq/getting-started)) for optimized querying.
   - Redis caching is used to **speed up API calls** and reduce load on MongoDB.

7. **Monitoring and Observability**
   - ![Grafana](https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white) **Grafana** ([Docs](https://grafana.com/docs/grafana/latest/getting-started)): Visual dashboards for system metrics.  
   - ![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white) **Prometheus** ([Docs](https://prometheus.io/docs/prometheus/latest/getting_started/)): Captures real-time performance data.  
   - ![Loki](https://img.shields.io/badge/Loki-00ADD8?style=for-the-badge&logo=grafana&logoColor=white) **Loki** ([Docs](https://grafana.com/docs/loki/latest/get-started/quick-start/)): Log aggregation and debugging.  
   - API endpoint to expose metrics:
     ```js
     app.get('/metrics', async (req, res) => {
         res.setHeader('Content-Type', client.register.contentType);
         const metrics = await client.register.metrics();
         res.send(metrics);
     });
     ```
     ```js
     // Create logger for the application
      const options = {
          
          transports: [
            new LokiTransport({
              host: "http://127.0.0.1:3100"
            })
          ]   
        }; 
      const logger = createLogger(options);
      ```

9. **System Resilience and Kubernetes Readiness**
   ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
   ![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
   - **Containerization:** Dockerized services for easy deployment and scaling.
   - **Future K8s Integration:** The system can be deployed on Kubernetes ([Docs](https://kubernetes.io/docs/setup/)) to scale dynamically with multiple pods.

---

## Project Setup & Running Locally

### Prerequisites
- **Docker & Docker Compose** ([Install Docker](https://www.docker.com/products/docker-desktop/))
- **Node.js** ([Install Node.js](https://nodejs.org/en/download))

### Step 1: Clone the Repository
```sh
 git clone https://github.com/your-repo/event-driven-system.git
 cd event-driven-system
```

### Step 2: Configure Prometheus Monitoring
- Find your **private IPv4 address** using:
```sh
 ipconfig   # On Windows
 ifconfig   # On Linux/macOS
```
- Edit `monitoring/prometheus.yml`, replace `<PRIVATE_IP>` with your system’s private IP:
```yaml
  - job_name: 'node'
    static_configs:
      - targets: ['<PRIVATE_IP>:9090']
```

### Step 3: Start Services with Docker Compose
```sh
 docker-compose up -d
```

### Step 4: Check Running Services
```sh
 docker ps
```

### Step 5: Access Services
| Service    | URL |
|------------|--------------------------------|
| **API Gateway**  | http://localhost:5000/api |
| **GraphQL Playground** | http://localhost:5000/graphql |
| **RabbitMQ Management** | http://localhost:15672 |
| **MongoDB** | mongodb://localhost:27017 |
| **Prometheus** | http://localhost:9090 |
| **Grafana** | http://localhost:3000 |
| **Loki** | http://localhost:3100 |

### Step 6: Check Metrics
```sh
 curl http://localhost:5000/metrics
```

---

## Key Features
### RabbitMQ - Event Broker
- Manages message queues between producers and consumers.
- Handles **message durability, load balancing, and retries**.
- **Docs:** [RabbitMQ Documentation](https://www.rabbitmq.com/documentation.html)

### MongoDB - Persistent Storage
- Stores processed data from consumers.
- Can scale with **sharding and replication**.
- **Docs:** [MongoDB Documentation](https://www.mongodb.com/docs/)

### Redis - Caching Layer
- Stores frequently accessed API responses to **reduce load on MongoDB**.
- Improves query performance.
- **Docs:** [Redis Documentation](https://redis.io/documentation)

### GraphQL - Optimized API
- Allows flexible queries with **reduced over-fetching**.
- Provides an efficient way to retrieve processed event data.
- **Docs:** [GraphQL Documentation](https://graphql.org/)

### Observability Stack
| Tool        | Purpose |
|------------|--------------------------------|
| **Prometheus** | Collects real-time system metrics |
| **Grafana** | Visualizes monitoring dashboards |
| **Loki** | Aggregates system logs |

---
### System Demonstration 📸
   - Below are screenshots of the system in action, showcasing key components like consumers processing events, and Docker managing all services.

### 1️⃣ Running Consumers in the Console
This screenshot shows active consumers processing messages from RabbitMQ. The logs confirm successful message processing, retries (if needed), and acknowledgments.

📸 Screenshot:
![Screenshot 2025-03-09 173708](https://github.com/user-attachments/assets/3236f962-2ad2-435d-a985-40e3f76ec1f8)
![Screenshot 2025-03-09 173829](https://github.com/user-attachments/assets/ac70d203-4c80-44f3-8115-6adbe529b1f8)


### 2️⃣ Docker Running All Services
This screenshot displays the Docker containers running RabbitMQ, MongoDB, Redis, API, Prometheus, Loki, and Grafana.

📸 Screenshot:
![Screenshot 2025-03-09 230340](https://github.com/user-attachments/assets/f09b6734-9e09-4424-8d8b-703acb2568e2)

### 3️⃣ Prometheus Monitoring
A screenshot of Prometheus metrics tracking system performance, including event throughput, response times, and service health.

📸 Screenshot:
![Screenshot 2025-03-09 230008](https://github.com/user-attachments/assets/80f7ded0-287c-4dbc-9038-b2cd0d90853f)


### 4️⃣ Grafana Dashboard
A screenshot of the Grafana dashboard visualizing system performance, logs, and alerts.

📸 Screenshot:
![Screenshot 2025-03-09 214253](https://github.com/user-attachments/assets/e9f15c58-984b-468b-b71c-7adb8866db95)
![Screenshot 2025-03-09 213956](https://github.com/user-attachments/assets/94777148-9526-42fc-9eda-077aceeabbb2)


### 5️⃣ Logs Showing Caching in Action
This screenshot highlights Redis caching successfully working, reducing database queries and improving response times.

📸 Screenshot:

![Screenshot 2025-03-09 231716](https://github.com/user-attachments/assets/9ae3b7a6-1a81-4ddc-9781-0a6441d69d0c)


## Future Enhancements
- **Kubernetes Deployment**: Scale dynamically with K8s pods.
- **Data Streaming**: Use Kafka alongside RabbitMQ for event stream processing.
- **Nginx as Load Balancer**: Implement **Nginx** to distribute traffic efficiently among multiple instances of the API, ensuring **high availability and load balancing**.

---

## Conclusion
This project successfully implements a **fault-tolerant, event-driven architecture** with **high scalability** and **observability**. With its containerized setup, **monitoring tools, caching, and robust messaging system**, it provides a **strong foundation** for real-time event processing applications.

---

Happy Coding! 🚀

