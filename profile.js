document.addEventListener('DOMContentLoaded', function() {
    // Profile Navigation Tabs
    setupTabs();
    
    // Initialize Charts
    initializeCharts();
    
    // Setup Skills Filter
    setupSkillsFilter();
    
    // Setup Form Interactions
    setupFormInteractions();
    
    // Setup Auto-update Features
    setupAutomatedUpdates();
    
    // Initialize Profile
    initializeProfile();
    
    // Setup Challenges Functionality
    setupChallengesFunctionality();
});

// Tab Navigation System
function setupTabs() {
    const tabs = document.querySelectorAll('.profile-tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current tab
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
            
            // Update URL hash without scrolling
            history.replaceState(null, null, `#${tabId}`);
        });
    });
    
    // Check for hash in URL on page load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        const tab = document.querySelector(`.tab[data-tab="${hash}"]`);
        if (tab) tab.click();
    }
}

// Chart Initialization
function initializeCharts() {
    // Progress Chart
    const progressCtx = document.getElementById('progress-chart');
    if (progressCtx) {
        const progressChart = new Chart(progressCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                datasets: [{
                    label: 'Your Progress',
                    data: [10, 15, 20, 22, 28, 35],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Average Progress',
                    data: [8, 12, 16, 19, 22, 25],
                    borderColor: '#95a5a6',
                    backgroundColor: 'rgba(149, 165, 166, 0.05)',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(44, 62, 80, 0.9)'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Completion %'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // Skills Radar Chart
    const radarCtx = document.getElementById('skills-radar');
    if (radarCtx) {
        const radarChart = new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: [
                    'Blockchain Basics',
                    'Smart Contracts',
                    'Web3 Integration',
                    'DeFi Concepts',
                    'Security',
                    'Cryptography'
                ],
                datasets: [{
                    label: 'Your Skills',
                    data: [100, 60, 30, 25, 10, 90],
                    backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    borderColor: '#3498db',
                    pointBackgroundColor: '#3498db',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: '#3498db'
                }, {
                    label: 'Required for Expert Level',
                    data: [80, 80, 80, 80, 80, 80],
                    backgroundColor: 'rgba(231, 76, 60, 0.05)',
                    borderColor: 'rgba(231, 76, 60, 0.5)',
                    borderDash: [5, 5],
                    pointBackgroundColor: 'rgba(231, 76, 60, 0)',
                    pointBorderColor: 'rgba(231, 76, 60, 0)',
                    pointHoverBackgroundColor: 'rgba(231, 76, 60, 0)',
                    pointHoverBorderColor: 'rgba(231, 76, 60, 0)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        borderWidth: 2
                    }
                },
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        backgroundColor: 'rgba(44, 62, 80, 0.9)'
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true,
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            backdropColor: 'transparent',
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// Skills Filtering System
function setupSkillsFilter() {
    const searchInput = document.getElementById('skills-search');
    const clearButton = document.getElementById('skills-search-clear');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (searchInput && clearButton) {
        // Search functionality
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            clearButton.style.display = searchTerm ? 'block' : 'none';
            filterSkills();
        });
        
        // Clear button
        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.focus();
        });
    }
    
    if (filterButtons.length) {
        // Filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                filterSkills();
            });
        });
    }
    
    // Filter function
    function filterSkills() {
        if (!skillCards.length) return;
        
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
        
        skillCards.forEach(card => {
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardDesc = card.querySelector('p').textContent.toLowerCase();
            const cardStatus = card.getAttribute('data-status');
            
            const matchesSearch = cardTitle.includes(searchTerm) || cardDesc.includes(searchTerm);
            const matchesFilter = activeFilter === 'all' || activeFilter === cardStatus;
            
            card.style.display = matchesSearch && matchesFilter ? 'flex' : 'none';
        });
    }
}

// Form Interactions
function setupFormInteractions() {
    // Personal info form
    const personalForm = document.getElementById('personal-info-form');
    if (personalForm) {
        personalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const displayName = document.getElementById('display-name').value;
            const userTitle = document.getElementById('user-title').value;
            
            // Update displayed name and title
            document.getElementById('profile-name').textContent = displayName;
            document.getElementById('profile-title').textContent = userTitle;
            
            // Save to localStorage
            saveUserData({name: displayName, title: userTitle});
            
            showToast('Profile updated successfully!');
        });
    }
    
    // Learning preferences form
    const prefsForm = document.getElementById('learning-prefs-form');
    if (prefsForm) {
        prefsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const weeklyGoal = document.getElementById('weekly-goal').value;
            const learningPath = document.getElementById('learning-path-select').value;
            
            // Update learning path selector in the learning path tab
            if (document.getElementById('path-select')) {
                document.getElementById('path-select').value = learningPath;
            }
            
            // Save to localStorage
            saveUserData({weeklyGoal, learningPath});
            
            // Update recommendations based on new preferences
            updateRecommendations();
            
            showToast('Learning preferences updated!');
        });
    }
    
    // Avatar change
    const avatarContainer = document.getElementById('profile-avatar');
    if (avatarContainer) {
        avatarContainer.addEventListener('click', function() {
            // In a real app, this would open a file picker
            const randomAvatar = `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`;
            document.getElementById('avatar-img').src = randomAvatar;
            
            // Save to localStorage
            saveUserData({avatar: randomAvatar});
            
            showToast('Profile picture updated!');
        });
    }
}

// Automated Updates
function setupAutomatedUpdates() {
    // Simulate real-time updates with periodic checks
    setInterval(updateActivityFeed, 60000); // Update activity every minute
    setInterval(updateSuggestions, 300000); // Update suggestions every 5 minutes
    
    // Setup auto-updating progress bars animation
    animateProgressBars();
}

// Initialize Profile from Saved Data
function initializeProfile() {
    const userData = loadUserData();
    
    // Update profile information if available
    if (userData.name) document.getElementById('profile-name').textContent = userData.name;
    if (userData.title) document.getElementById('profile-title').textContent = userData.title;
    if (userData.avatar) document.getElementById('avatar-img').src = userData.avatar;
    
    // Count and display stats
    updateProfileStats();
    
    // Generate automatic suggestions based on progress
    updateSuggestions();
    
    // Simulate an activity feed
    updateActivityFeed(true);
}

// Generate Automated Suggestions
function updateSuggestions() {
    const suggestionsContainer = document.getElementById('auto-suggestions');
    if (!suggestionsContainer) return;
    
    const userData = loadUserData();
    const completedSkills = document.querySelectorAll('.skill-card[data-status="completed"]').length;
    const inProgressSkills = document.querySelectorAll('.skill-card[data-status="in-progress"]').length;
    
    // Clear current suggestions
    suggestionsContainer.innerHTML = '';
    
    // Generate new suggestions based on user's progress
    const suggestions = [];
    
    if (completedSkills < 2) {
        suggestions.push({
            icon: 'fa-graduation-cap',
            title: 'Complete Blockchain Basics',
            description: 'Get started with the foundation of blockchain technology',
            action: 'Start Learning'
        });
    } else if (inProgressSkills > 0) {
        suggestions.push({
            icon: 'fa-code',
            title: 'Continue Solidity Programming',
            description: 'You\'re making good progress, keep going!',
            action: 'Continue'
        });
    } else {
        suggestions.push({
            icon: 'fa-project-diagram',
            title: 'Try Building a dApp',
            description: 'Apply your skills with a practical project',
            action: 'Start Project'
        });
    }
    
    // Add a personalized suggestion based on interests
    const interestSuggestions = [
        {
            icon: 'fa-chart-line',
            title: 'Explore DeFi Protocols',
            description: 'Learn how decentralized finance works in practice',
            action: 'Explore DeFi'
        },
        {
            icon: 'fa-shield-alt',
            title: 'Smart Contract Security',
            description: 'Learn how to protect your blockchain applications',
            action: 'Learn Security'
        },
        {
            icon: 'fa-dice-d20',
            title: 'NFT Development Workshop',
            description: 'Create your own NFT collection from scratch',
            action: 'Join Workshop'
        }
    ];
    
    // Add a random suggestion from the interest list
    suggestions.push(interestSuggestions[Math.floor(Math.random() * interestSuggestions.length)]);
    
    // Create suggestion elements
    suggestions.forEach(suggestion => {
        const suggestionCard = document.createElement('div');
        suggestionCard.className = 'suggestion-card';
        suggestionCard.innerHTML = `
            <div class="suggestion-icon"><i class="fas ${suggestion.icon}"></i></div>
            <div class="suggestion-content">
                <h4>${suggestion.title}</h4>
                <p>${suggestion.description}</p>
                <a href="#" class="btn btn-small">${suggestion.action}</a>
            </div>
        `;
        
        // Add animation for new suggestions
        suggestionCard.style.opacity = '0';
        suggestionCard.style.transform = 'translateY(20px)';
        
        suggestionsContainer.appendChild(suggestionCard);
        
        // Trigger animation
        setTimeout(() => {
            suggestionCard.style.transition = 'opacity 0.5s, transform 0.5s';
            suggestionCard.style.opacity = '1';
            suggestionCard.style.transform = 'translateY(0)';
        }, 100);
    });
}

// Simulate Activity Feed Updates
function updateActivityFeed(isInitial = false) {
    const activityFeed = document.getElementById('activity-feed');
    if (!activityFeed) return;
    
    if (!isInitial) {
        // Only add new activities periodically, not on initial load
        const activities = [
            {
                icon: 'fa-book',
                text: 'Started learning <strong>Web3.js Integration</strong>',
                time: 'Just now'
            },
            {
                icon: 'fa-code-branch',
                text: 'Completed <strong>Smart Contract Challenge</strong>',
                time: 'Just now'
            },
            {
                icon: 'fa-tasks',
                text: 'Updated weekly goal to <strong>6 hours</strong>',
                time: 'Just now'
            }
        ];
        
        // Add a random activity
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <div class="activity-icon"><i class="fas ${randomActivity.icon}"></i></div>
            <div class="activity-content">
                <p>${randomActivity.text}</p>
                <span class="activity-time">${randomActivity.time}</span>
            </div>
        `;
        
        // Add animation
        activityItem.style.opacity = '0';
        activityItem.style.transform = 'translateX(-20px)';
        
        // Insert at the top
        activityFeed.insertBefore(activityItem, activityFeed.firstChild);
        
        // Trigger animation
        setTimeout(() => {
            activityItem.style.transition = 'opacity 0.5s, transform 0.5s';
            activityItem.style.opacity = '1';
            activityItem.style.transform = 'translateX(0)';
        }, 100);
        
        // Limit the number of activities shown
        if (activityFeed.children.length > 5) {
            activityFeed.removeChild(activityFeed.lastChild);
        }
    }
}

// Animate Progress Bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 300);
    });
}

// Update Profile Stats
function updateProfileStats() {
    // Count skills
    const completedSkills = document.querySelectorAll('.skill-card[data-status="completed"]').length;
    document.getElementById('skills-completed').textContent = completedSkills;
    
    // Count projects (simulated)
    const projectsCompleted = 2; // This would be dynamic in a real app
    document.getElementById('projects-completed').textContent = projectsCompleted;
    
    // Count achievements
    const achievementsEarned = document.querySelectorAll('.achievement-card.unlocked').length;
    document.getElementById('achievements-earned').textContent = achievementsEarned;
}

// Toast Notification System
function showToast(message, type = 'success') {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        document.body.appendChild(toast);
        
        // Add styles inline since this is a dynamically created element
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.padding = '12px 20px';
        toast.style.borderRadius = '6px';
        toast.style.color = 'white';
        toast.style.fontWeight = '600';
        toast.style.zIndex = '10000';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'opacity 0.3s, transform 0.3s';
        toast.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
    }
    
    // Set color based on type
    if (type === 'success') {
        toast.style.backgroundColor = '#27ae60';
    } else if (type === 'error') {
        toast.style.backgroundColor = '#e74c3c';
    } else if (type === 'warning') {
        toast.style.backgroundColor = '#f39c12';
    } else if (type === 'info') {
        toast.style.backgroundColor = '#3498db';
    }
    
    // Set content and show
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    
    // Hide after delay
    clearTimeout(toast.timeout);
    toast.timeout = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 3000);
}

// Local Storage Helper Functions
function saveUserData(data) {
    let userData = loadUserData();
    userData = {...userData, ...data};
    localStorage.setItem('blockchainRoadmapUserData', JSON.stringify(userData));
}

function loadUserData() {
    const userData = localStorage.getItem('blockchainRoadmapUserData');
    return userData ? JSON.parse(userData) : {};
}

// Add a link to the profile page in index.html
function addProfileLink() {
    const nav = document.querySelector('nav ul');
    if (nav) {
        const profileLink = document.createElement('li');
        profileLink.innerHTML = '<a href="profile.html">My Profile</a>';
        nav.appendChild(profileLink);
    }
}

// Call this function in case the script is loaded on the index page
addProfileLink();

// Challenges Section
function setupChallengesFunctionality() {
    setupChallengeFiltering();
    setupChallengeSorting();
    setupChallengeModal();
    setupCodeEditor();
    trackChallengeStreak();
    updateChallengeStats();
}

// Challenge Filtering
function setupChallengeFiltering() {
    const filterButtons = document.querySelectorAll('.challenge-filters .filter-btn');
    const challengeCards = document.querySelectorAll('.challenge-card');
    
    if (!filterButtons.length || !challengeCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter challenge cards
            challengeCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-type') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Challenge Sorting
function setupChallengeSorting() {
    const sortSelect = document.getElementById('challenge-sort-select');
    const challengeGrid = document.getElementById('challenge-grid');
    
    if (!sortSelect || !challengeGrid) return;
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const challengeCards = Array.from(document.querySelectorAll('.challenge-card'));
        
        // Sort challenge cards based on selected option
        challengeCards.sort((a, b) => {
            if (sortValue === 'difficulty') {
                const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
                const aDifficulty = a.querySelector('.challenge-difficulty').classList.contains('easy') ? 'easy' 
                                  : a.querySelector('.challenge-difficulty').classList.contains('medium') ? 'medium' : 'hard';
                const bDifficulty = b.querySelector('.challenge-difficulty').classList.contains('easy') ? 'easy' 
                                  : b.querySelector('.challenge-difficulty').classList.contains('medium') ? 'medium' : 'hard';
                
                return difficultyOrder[aDifficulty] - difficultyOrder[bDifficulty];
            } else if (sortValue === 'points') {
                const aPoints = parseInt(a.querySelector('.challenge-points').textContent.match(/\d+/)[0]);
                const bPoints = parseInt(b.querySelector('.challenge-points').textContent.match(/\d+/)[0]);
                
                return bPoints - aPoints; // Sort by points descending
            } else {
                // Default: most recent (assuming DOM order is chronological)
                return 0;
            }
        });
        
        // Reorder DOM elements
        challengeCards.forEach(card => challengeGrid.appendChild(card));
        
        // Apply some animation
        challengeCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s, transform 0.5s';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    });
}

// Challenge Modal
function setupChallengeModal() {
    const modal = document.getElementById('challenge-modal');
    const viewButtons = document.querySelectorAll('.view-challenge-btn, .challenge-start-btn, .daily-challenge-btn');
    const closeModal = document.querySelector('.close-modal');
    
    if (!modal || !viewButtons.length || !closeModal) return;
    
    // Open modal when view button is clicked
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get challenge info from the card
            const card = this.closest('.challenge-card') || this.closest('.daily-challenge-card');
            const title = card.querySelector('h3') ? card.querySelector('h3').textContent 
                        : card.querySelector('h4') ? card.querySelector('h4').textContent : 'Challenge';
            
            // Update modal content
            document.getElementById('challenge-modal-title').textContent = title;
            
            // Determine if it's a quiz or coding challenge
            const isQuiz = card.getAttribute('data-type') === 'quizzes';
            document.getElementById('code-editor-container').style.display = isQuiz ? 'none' : 'block';
            document.getElementById('quiz-container').style.display = isQuiz ? 'block' : 'none';
            document.getElementById('run-code-btn').style.display = isQuiz ? 'none' : 'inline-block';
            
            // Show the modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // If this is a "start" button, mark as in progress and change button text
            if (this.classList.contains('challenge-start-btn')) {
                this.textContent = 'Continue Challenge';
                
                // Add status indicator if it doesn't exist
                if (!card.querySelector('.challenge-status')) {
                    const statusDiv = document.createElement('div');
                    statusDiv.className = 'challenge-status';
                    statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
                    card.appendChild(statusDiv);
                }
            }
            
            // Load challenge content based on title
            loadChallengeContent(title);
        });
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        }
    });
    
    // Setup submit button
    const submitBtn = document.getElementById('submit-challenge-btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const title = document.getElementById('challenge-modal-title').textContent;
            const isQuiz = document.getElementById('quiz-container').style.display !== 'none';
            
            if (isQuiz) {
                evaluateQuiz();
            } else {
                evaluateCode();
            }
            
            // Close modal after submission
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
                
                // Update card status
                updateChallengeStatus(title, true);
                
                // Update stats
                updateChallengeStats();
                
                // Show completion toast
                showToast('Challenge completed! You earned points!', 'success');
            }, 500);
        });
    }
}

// Code Editor Setup
function setupCodeEditor() {
    // In a real app, this would initialize a code editor like Monaco or CodeMirror
    const runCodeBtn = document.getElementById('run-code-btn');
    
    if (runCodeBtn) {
        runCodeBtn.addEventListener('click', function() {
            // Simulate code execution
            showToast('Code ran successfully!', 'info');
        });
    }
}

// Load Challenge Content
function loadChallengeContent(title) {
    // This would normally fetch from a server, but we'll simulate
    const challenges = {
        'Smart Contract Function': {
            description: 'In this challenge, you need to write a Solidity function that handles a token transfer between accounts with proper error handling and events.',
            requirements: [
                'Function should accept recipient address and amount',
                'Check for sufficient balance before transfer',
                'Emit a Transfer event after successful transfer',
                'Return a boolean indicating success'
            ],
            codeTemplate: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenTransfer {
    mapping(address => uint256) balances;
    
    event Transfer(address indexed from, address indexed to, uint256 amount);
    
    // TODO: Implement transferTokens function
    function transferTokens(address to, uint256 amount) public returns (bool) {
        // Your code here
    }
}`
        },
        'Blockchain Basics Quiz': {
            description: 'Test your knowledge of fundamental blockchain concepts, including consensus mechanisms, block structure, and cryptographic principles.',
            isQuiz: true,
            questions: [
                {
                    question: 'Which consensus algorithm does Bitcoin use?',
                    options: ['Proof of Stake', 'Proof of Work', 'Proof of Authority', 'Delegated Proof of Stake'],
                    answer: 'b'
                },
                {
                    question: 'What cryptographic function is commonly used for creating blockchain addresses?',
                    options: ['AES-256', 'MD5', 'SHA-256', 'RSA'],
                    answer: 'c'
                }
            ]
        }
    };
    
    // Find the challenge
    const challenge = challenges[title] || {
        description: 'Challenge details will be loaded here.',
        requirements: ['Complete the task as specified'],
        codeTemplate: '// Write your solution here'
    };
    
    // Update description
    document.getElementById('challenge-description').innerHTML = `
        <h4>Description</h4>
        <p>${challenge.description}</p>
    `;
    
    // Update requirements
    if (!challenge.isQuiz) {
        const requirementsList = challenge.requirements.map(req => `<li>${req}</li>`).join('');
        document.getElementById('challenge-requirements').innerHTML = `
            <h4>Requirements</h4>
            <ul>${requirementsList}</ul>
        `;
        
        // Update code editor
        document.getElementById('code-editor').textContent = challenge.codeTemplate || '// Write your solution here';
    } else {
        // Setup quiz
        document.getElementById('challenge-requirements').innerHTML = '';
        
        if (challenge.questions) {
            const quizForm = document.getElementById('quiz-form');
            quizForm.innerHTML = '';
            
            challenge.questions.forEach((q, i) => {
                const questionHTML = `
                    <div class="quiz-question">
                        <h4>Question ${i + 1}</h4>
                        <p>${q.question}</p>
                        <div class="quiz-options">
                            <label><input type="radio" name="q${i + 1}" value="a"> ${q.options[0]}</label>
                            <label><input type="radio" name="q${i + 1}" value="b"> ${q.options[1]}</label>
                            <label><input type="radio" name="q${i + 1}" value="c"> ${q.options[2]}</label>
                            <label><input type="radio" name="q${i + 1}" value="d"> ${q.options[3]}</label>
                        </div>
                    </div>
                `;
                
                quizForm.innerHTML += questionHTML;
            });
        }
    }
}

// Evaluate Quiz
function evaluateQuiz() {
    // In a real app, this would check answers against correct ones
    // For demo, we'll just simulate success
    showToast('Quiz submitted successfully!', 'success');
}

// Evaluate Code
function evaluateCode() {
    // In a real app, this would validate the code
    // For demo, we'll just simulate success
    showToast('Code solution accepted!', 'success');
}

// Update Challenge Status
function updateChallengeStatus(title, completed = false) {
    // Find the challenge card with this title
    const cards = document.querySelectorAll('.challenge-card');
    let targetCard = null;
    
    cards.forEach(card => {
        const cardTitle = card.querySelector('h3').textContent;
        if (cardTitle === title) {
            targetCard = card;
        }
    });
    
    if (!targetCard) return;
    
    // Update the status
    let statusDiv = targetCard.querySelector('.challenge-status');
    
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.className = 'challenge-status';
        targetCard.appendChild(statusDiv);
    }
    
    if (completed) {
        statusDiv.className = 'challenge-status completed just-completed';
        statusDiv.innerHTML = '<i class="fas fa-check-circle"></i>';
        
        // Change button text
        const button = targetCard.querySelector('button');
        if (button) {
            button.textContent = 'View Challenge';
            button.className = 'btn btn-small view-challenge-btn';
        }
        
        // Save completion to user data
        const userData = loadUserData();
        userData.completedChallenges = userData.completedChallenges || [];
        if (!userData.completedChallenges.includes(title)) {
            userData.completedChallenges.push(title);
            userData.challengePoints = (userData.challengePoints || 0) + getChallengePoints(targetCard);
            saveUserData(userData);
        }
    } else {
        statusDiv.className = 'challenge-status';
        statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    }
    
    // Remove the animation class after animation completes
    setTimeout(() => {
        statusDiv.classList.remove('just-completed');
    }, 1000);
}

// Get Challenge Points
function getChallengePoints(card) {
    if (!card) return 0;
    
    const pointsText = card.querySelector('.challenge-points').textContent;
    const pointsMatch = pointsText.match(/\d+/);
    
    return pointsMatch ? parseInt(pointsMatch[0]) : 0;
}

// Update Challenge Stats
function updateChallengeStats() {
    const userData = loadUserData();
    
    // Update completed challenges count
    const completedChallenges = userData.completedChallenges || [];
    const completedCount = document.getElementById('completed-challenges');
    if (completedCount) {
        completedCount.textContent = completedChallenges.length;
    }
    
    // Update points
    const pointsElement = document.getElementById('challenge-points');
    if (pointsElement) {
        pointsElement.textContent = userData.challengePoints || 0;
    }
    
    // Update streak (would normally be calculated based on daily logins)
    const streakElement = document.getElementById('current-streak');
    if (streakElement) {
        streakElement.textContent = userData.currentStreak || 0;
    }
}

// Track Daily Challenge Streak
function trackChallengeStreak() {
    const userData = loadUserData();
    const today = new Date().toDateString();
    
    // Initialize if not exists
    if (!userData.lastLogin || userData.lastLogin !== today) {
        if (!userData.lastLogin) {
            // First login
            userData.currentStreak = 1;
        } else {
            // Check if yesterday
            const lastLogin = new Date(userData.lastLogin);
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastLogin.toDateString() === yesterday.toDateString()) {
                // Consecutive login
                userData.currentStreak = (userData.currentStreak || 0) + 1;
            } else {
                // Streak broken
                userData.currentStreak = 1;
            }
        }
        
        userData.lastLogin = today;
        saveUserData(userData);
    }
    
    // Update UI
    const streakElement = document.getElementById('current-streak');
    if (streakElement) {
        streakElement.textContent = userData.currentStreak || 0;
    }
} 