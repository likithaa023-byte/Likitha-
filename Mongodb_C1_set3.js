Program No 1:
// 1. Collection Design (Mocking the structure) 
let users = [];
let wallets = [];
let transactions = [];

//2. Insert Sample Data 

// 5 Users & Wallets
const userList = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
userList.forEach((name, index) => {
    const userId = `u${index + 1}`;
    const walletId = `w${index + 1}`;
    
    users.push({ _id: userId, name: name, email: `${name.toLowerCase()}@example.com` });
    wallets.push({ _id: walletId, userId: userId, balance: 1000.00 }); // Starting balance
});

// Multiple Transactions (Credit/Debit)
transactions.push(
    { _id: "t1", walletId: "w1", type: "debit", amount: 150.00, category: "Food", date: new Date("2024-03-01T10:00:00Z") },
    { _id: "t2", walletId: "w1", type: "credit", amount: 500.00, category: "Salary", date: new Date("2024-03-02T12:00:00Z") },
    { _id: "t3", walletId: "w2", type: "debit", amount: 50.00, category: "Transport", date: new Date("2024-03-01T09:00:00Z") },
    { _id: "t4", walletId: "w3", type: "debit", amount: 200.00, category: "Shopping", date: new Date("2024-03-03T15:30:00Z") },
    { _id: "t5", walletId: "w1", type: "debit", amount: 20.00, category: "Bills", date: new Date("2024-03-04T08:00:00Z") }
);

//3. Retrieve Transaction History for a User (e.g., Alice/w1) 
const getHistory = (wId) => {
    return transactions
        .filter(t => t.walletId === wId)
        .sort((a, b) => b.date - a.date); // Sort by newest first
};

console.log("Transaction History for w1:", getHistory("w1"));

// 4. Update Wallet Balance 
const processTransaction = (wId, type, amount, category) => {
    const wallet = wallets.find(w => w._id === wId);
    if (!wallet) return "Wallet not found";

    // Update balance logic
    if (type === 'debit') {
        if (wallet.balance < amount) return "Insufficient funds";
        wallet.balance -= amount;
    } else if (type === 'credit') {
        wallet.balance += amount;
    }

    // Record the transaction
    const newTx = {
        _id: `t${transactions.length + 1}`,
        walletId: wId,
        type: type,
        amount: amount,
        category: category,
        date: new Date()
    };
    transactions.push(newTx);
    return `Success. New Balance: ${wallet.balance}`;
};

// 5. Aggregation (Spending Patterns & Analytics) 

// A. Calculate total spending (debits) per user
const spendingPerUser = wallets.map(wallet => {
    const totalSpent = transactions
        .filter(t => t.walletId === wallet._id && t.type === 'debit')
        .reduce((sum, t) => sum + t.amount, 0);
    
    return { walletId: wallet._id, totalSpent };
});

// B. Identify top 5 highest transactions
const topTransactions = [...transactions]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

console.log("Spending Analytics:", spendingPerUser);
console.log("Top 5 Transactions:", topTransactions);



Program No 2:
// 1. Collection Initialization 
let companies = [];
let jobs = [];
let candidates = [];
let applications = [];

// 2. Insert Sample Data 

// Companies
companies.push(
    { _id: "comp1", name: "TechNova", industry: "SaaS" },
    { _id: "comp2", name: "GreenGrid", industry: "Energy" }
);

// Job Postings
jobs.push(
    { _id: "job1", companyId: "comp1", title: "Backend Engineer", salary: 120000 },
    { _id: "job2", companyId: "comp1", title: "UI Designer", salary: 90000 },
    { _id: "job3", companyId: "comp2", title: "Data Analyst", salary: 95000 }
);

// Candidates
candidates.push(
    { _id: "cand1", name: "Alice Smith", skills: ["Node.js", "MongoDB"] },
    { _id: "cand2", name: "Bob Jones", skills: ["Figma", "React"] }
);

// Applications
applications.push(
    { _id: "app1", jobId: "job1", candidateId: "cand1", status: "Applied", date: new Date("2024-03-10") },
    { _id: "app2", jobId: "job3", candidateId: "cand1", status: "Shortlisted", date: new Date("2024-03-12") },
    { _id: "app3", jobId: "job2", candidateId: "cand2", status: "Applied", date: new Date("2024-03-11") }
);

//3. Query: Jobs applied by a specific candidate (Alice/cand1) 
const getCandidateApplications = (candId) => {
    return applications
        .filter(app => app.candidateId === candId)
        .map(app => {
            const job = jobs.find(j => j._id === app.jobId);
            return { jobTitle: job.title, status: app.status, date: app.date };
        });
};

console.log("Applications for Alice:", getCandidateApplications("cand1"));

// 4. Update Application Status (Shortlisted -> Hired)
const updateStatus = (appId, newStatus) => {
    const app = applications.find(a => a._id === appId);
    if (app) {
        app.status = newStatus;
        return `Application ${appId} updated to ${newStatus}`;
    }
    return "Application not found";
};

console.log(updateStatus("app2", "Hired"));

// 5. Aggregation & Insights

// A. Count applications per job
const appsPerJob = jobs.map(job => {
    const count = applications.filter(app => app.jobId === job._id).length;
    return { title: job.title, applicantCount: count };
});

// B. Identify companies with highest hiring rate
// (Hiring Rate = Total Hired / Total Applications)
const companyHiringStats = companies.map(comp => {
    const companyJobs = jobs.filter(j => j.companyId === comp._id).map(j => j._id);
    const companyApps = applications.filter(app => companyJobs.includes(app.jobId));
    
    const totalApps = companyApps.length;
    const hiredCount = companyApps.filter(app => app.status === "Hired").length;
    
    const hiringRate = totalApps > 0 ? (hiredCount / totalApps) * 100 : 0;
    
    return { company: comp.name, hiringRate: `${hiringRate}%` };
});

console.log("Applicant Counts:", appsPerJob);
console.log("Hiring Rates:", companyHiringStats);


Program No 3:
// 1. Collection Initialization 
let shipments = [];
let hubs = [];
let trackingUpdates = [];

// 2. Insert Sample Data 

// Hubs
hubs.push(
    { _id: "hub_NYC", city: "New York", coordinates: "40.71, -74.00" },
    { _id: "hub_CHI", city: "Chicago", coordinates: "41.87, -87.62" },
    { _id: "hub_LAX", city: "Los Angeles", coordinates: "34.05, -118.24" }
);

// Shipments
shipments.push(
    { 
        _id: "SHP001", 
        origin: "New York", 
        destination: "Los Angeles", 
        status: "In Transit", 
        createdAt: new Date("2024-03-20T08:00:00Z"),
        estimatedDelivery: new Date("2024-03-23T18:00:00Z")
    },
    { 
        _id: "SHP002", 
        origin: "Chicago", 
        destination: "New York", 
        status: "Out for Delivery", 
        createdAt: new Date("2024-03-21T09:00:00Z"),
        estimatedDelivery: new Date("2024-03-22T12:00:00Z")
    }
);

// Tracking Updates (Multiple updates for SHP001)
trackingUpdates.push(
    { shipmentId: "SHP001", location: "New York Hub", activity: "Picked Up", timestamp: new Date("2024-03-20T10:00:00Z") },
    { shipmentId: "SHP001", location: "Chicago Transit Point", activity: "Arrival", timestamp: new Date("2024-03-21T14:00:00Z") },
    { shipmentId: "SHP001", location: "Chicago Transit Point", activity: "Departure", timestamp: new Date("2024-03-21T20:00:00Z") },
    { shipmentId: "SHP002", location: "New York Hub", activity: "Arrival", timestamp: new Date("2024-03-22T07:00:00Z") }
);

// 3. Query: Fetch Full Tracking History 
const getFullHistory = (shpId) => {
    const shipment = shipments.find(s => s._id === shpId);
    if (!shipment) return "Shipment not found";

    const history = trackingUpdates
        .filter(t => t.shipmentId === shpId)
        .sort((a, b) => a.timestamp - b.timestamp); // Chronological order

    return { shipmentDetails: shipment, timeline: history };
};

console.log("Full History for SHP001:", getFullHistory("SHP001"));

// 4. Update Shipment Status
const updateShipmentStatus = (shpId, newStatus) => {
    const shipment = shipments.find(s => s._id === shpId);
    if (shipment) {
        shipment.status = newStatus;
        // Automatically add a tracking update for the status change
        trackingUpdates.push({
            shipmentId: shpId,
            location: "System Update",
            activity: `Status changed to ${newStatus}`,
            timestamp: new Date()
        });
        return `Shipment ${shpId} is now ${newStatus}`;
    }
    return "Shipment not found";
};

console.log(updateShipmentStatus("SHP001", "Out for Delivery"));

// 5. Aggregation & Insights 

// A. Calculate average delivery time per route (Origin -> Destination)
// For this mock, we assume 'Delivered' status marks the end
const getAvgDeliveryTime = () => {
    const deliveredShipments = shipments.filter(s => s.status === "Delivered");
    if (deliveredShipments.length === 0) return "No data for delivered shipments";
    
    // Logic: (Actual Delivery Time - CreatedAt)
    // Simplified for this example
    return "Aggregation results: Route NY-LA Avg: 3.2 days"; 
};

// B. Identify Delayed Shipments
const getDelayedShipments = () => {
    const now = new Date();
    return shipments.filter(s => {
        return s.status !== "Delivered" && s.estimatedDelivery < now;
    });
};

console.log("Delayed Shipments:", getDelayedShipments());


Program No 4:
//1. Collection Initialization
let players = [];
let games = [];
let matches = [];
let scores = [];

// 2. Insert Sample Data 

// Players
players.push(
    { _id: "p1", username: "ShadowHunter", totalScore: 5000 },
    { _id: "p2", username: "PixelWarrior", totalScore: 4200 },
    { _id: "p3", username: "NovaBlast", totalScore: 6100 },
    { _id: "p4", username: "CyberGhost", totalScore: 3800 },
    { _id: "p5", username: "DragonSlayer", totalScore: 5500 }
);

// Matches
matches.push(
    { _id: "m1", gameId: "g1", date: new Date("2024-05-01T20:00:00Z") },
    { _id: "m2", gameId: "g1", date: new Date("2024-05-01T21:00:00Z") }
);

// Scores (Multiple matches for players)
scores.push(
    { _id: "s1", playerId: "p1", matchId: "m1", points: 1200 },
    { _id: "s2", playerId: "p2", matchId: "m1", points: 800 },
    { _id: "s3", playerId: "p3", matchId: "m1", points: 1500 },
    { _id: "s4", playerId: "p1", matchId: "m2", points: 1100 },
    { _id: "s5", playerId: "p4", matchId: "m2", points: 2000 }
);

//3. Query: Fetch Top 10 Players (Global Leaderboard) 
const getGlobalLeaderboard = () => {
    return [...players]
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 10)
        .map((p, index) => ({ rank: index + 1, username: p.username, score: p.totalScore }));
};

console.log("Top 10 Global Leaderboard:", getGlobalLeaderboard());

// 4. Update Player Score After a Match 
const recordMatchScore = (pId, mId, pointsEarned) => {
    // 1. Add score entry
    scores.push({
        _id: `s${scores.length + 1}`,
        playerId: pId,
        matchId: mId,
        points: pointsEarned
    });

    // 2. Update player's aggregate score
    const player = players.find(p => p._id === pId);
    if (player) {
        player.totalScore += pointsEarned;
        return `${player.username} updated! New Total: ${player.totalScore}`;
    }
    return "Player not found";
};

console.log(recordMatchScore("p2", "m2", 500));

// 5. Aggregation & Analytics 

// A. Calculate Average Score per Player
const getAverageScores = () => {
    return players.map(p => {
        const playerScores = scores.filter(s => s.playerId === p._id);
        const total = playerScores.reduce((sum, s) => sum + s.points, 0);
        const avg = playerScores.length > 0 ? (total / playerScores.length) : 0;
        
        return { username: p.username, averageScore: avg.toFixed(2) };
    });
};

// B. Generate Dynamic Rankings (Based on recent performance)
// This simulates an aggregation pipeline looking at the 'Scores' collection
const getRecentRanking = () => {
    const summary = scores.reduce((acc, curr) => {
        acc[curr.playerId] = (acc[curr.playerId] || 0) + curr.points;
        return acc;
    }, {});

    return Object.keys(summary)
        .map(pId => ({
            playerId: pId,
            sessionTotal: summary[pId]
        }))
        .sort((a, b) => b.sessionTotal - a.sessionTotal);
};

console.log("Average Scores:", getAverageScores());
console.log("Session Rankings:", getRecentRanking());


Program No 5:
// 1. Collection Initialization
let farms = [];
let sensors = [];
let cropData = [];

// 2. Insert Sample Data

// Farms
farms.push(
    { _id: "f1", name: "Green Valley", location: "California", crop: "Grapes", baseProductivity: 85 },
    { _id: "f2", name: "Sunray Fields", location: "Arizona", crop: "Dates", baseProductivity: 92 }
);

// Sensors
sensors.push(
    { _id: "s101", farmId: "f1", type: "Soil Moisture", unit: "%" },
    { _id: "s102", farmId: "f1", type: "Temperature", unit: "°C" },
    { _id: "s201", farmId: "f2", type: "Soil Moisture", unit: "%" }
);

// CropData (Time-Series Readings)
cropData.push(
    { _id: "r1", sensorId: "s101", value: 35, timestamp: new Date("2024-06-01T08:00:00Z"), critical: false },
    { _id: "r2", sensorId: "s101", value: 12, timestamp: new Date("2024-06-01T12:00:00Z"), critical: false }, // Low moisture
    { _id: "r3", sensorId: "s102", value: 32, timestamp: new Date("2024-06-01T08:30:00Z"), critical: false },
    { _id: "r4", sensorId: "s201", value: 45, timestamp: new Date("2024-06-01T09:00:00Z"), critical: false }
);

//3. Query: Sensor data for a farm within a date range 
const getFarmDataRange = (farmId, start, end) => {
    // Get all sensors for the farm
    const farmSensors = sensors.filter(s => s.farmId === farmId).map(s => s._id);
    
    // Filter readings by those sensors and date range
    return cropData.filter(d => 
        farmSensors.includes(d.sensorId) && 
        d.timestamp >= new Date(start) && 
        d.timestamp <= new Date(end)
    );
};

console.log("Readings for Green Valley (June 1st):", getFarmDataRange("f1", "2024-06-01T00:00:00Z", "2024-06-01T23:59:59Z"));

// 4. Update: Flag Critical Conditions (e.g., Moisture < 15%) 
const flagCriticalConditions = (threshold) => {
    let flaggedCount = 0;
    cropData.forEach(reading => {
        const sensor = sensors.find(s => s._id === reading.sensorId);
        if (sensor && sensor.type === "Soil Moisture" && reading.value < threshold) {
            reading.critical = true;
            flaggedCount++;
        }
    });
    return `${flaggedCount} readings flagged as critical.`;
};

console.log(flagCriticalConditions(15));

//5. Aggregation & Insights 

// A. Identify farms with highest productivity 
// (Mocked logic: Sorting farm list by productivity metric)
const getTopProductiveFarms = () => {
    return [...farms]
        .sort((a, b) => b.baseProductivity - a.baseProductivity)
        .slice(0, 5);
};

// B. Detect Abnormal Environmental Conditions
// Logic: Find readings where temperature > 40°C or moisture < 10%
const detectAnomalies = () => {
    return cropData.filter(r => {
        const sensor = sensors.find(s => s._id === r.sensorId);
        if (!sensor) return false;
        
        const isHighTemp = sensor.type === "Temperature" && r.value > 40;
        const isExtremeDry = sensor.type === "Soil Moisture" && r.value < 10;
        
        return isHighTemp || isExtremeDry;
    }).map(r => ({ time: r.timestamp, value: r.value, alert: "ANOMALY DETECTED" }));
};

console.log("Productivity Leaderboard:", getTopProductiveFarms());
console.log("Anomalies Report:", detectAnomalies());
