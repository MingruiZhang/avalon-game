const fakePlayers = [
  {
    "avatarId": 3,
    "name": "Admin",
    "isReady": true,
    "isDummy": false,
    "isAdmin": true,
    "roleInfo": {
      "roleName": "Merlin",
      "isEvil": false,
      "specialities": [
        6,
        1
      ],
      "description": "You know evil, they are",
      "knowPlayers": [
        "笑笑-733",
        "BruoMars-472",
        "道长-933",
        "Ming"
      ],
      "overviewInfo": {
        "goodList": [
          "Merlin",
          "Percival",
          "Servant of Arthur",
          "Servant of Arthur",
          "Servant of Arthur"
        ],
        "evilList": [
          "Morgana",
          "Assassin",
          "Oberon",
          "Minion of Mordred"
        ]
      }
    }
  },
  {
    "avatarId": 3,
    "name": "Hello-561",
    "isReady": true,
    "isDummy": true,
    "isAdmin": false,
    "roleInfo": {
      "roleName": "Servant of Arthur",
      "isEvil": false,
      "specialities": [],
      "description": "You know nothing :)",
      "overviewInfo": {
        "goodList": [
          "Merlin",
          "Percival",
          "Servant of Arthur",
          "Servant of Arthur",
          "Servant of Arthur"
        ],
        "evilList": [
          "Morgana",
          "Assassin",
          "Oberon",
          "Minion of Mordred"
        ]
      }
    }
  },
  {
    "avatarId": 4,
    "name": "笑笑-733",
    "isReady": true,
    "isDummy": true,
    "isAdmin": false,
    "roleInfo": {
      "roleName": "Oberon",
      "isEvil": true,
      "specialities": [
        5
      ],
      "description": "You know nothing :)",
      "knowPlayers": [
        "BruoMars-472",
        "Ming"
      ],
      "overviewInfo": {
        "goodList": [
          "Merlin",
          "Percival",
          "Servant of Arthur",
          "Servant of Arthur",
          "Servant of Arthur"
        ],
        "evilList": [
          "Morgana",
          "Assassin",
          "Oberon",
          "Minion of Mordred"
        ]
      }
    }
  },
  {
    "avatarId": 1,
    "name": "道长-537",
    "isReady": true,
    "isDummy": true,
    "isAdmin": false,
    "roleInfo": {
      "roleName": "Percival",
      "isEvil": false,
      "specialities": [
        2
      ],
      "description": "You can detect people with magic, they are",
      "knowPlayers": [
        "Admin",
        "道长-933"
      ],
      "overviewInfo": {
        "goodList": [
          "Merlin",
          "Percival",
          "Servant of Arthur",
          "Servant of Arthur",
          "Servant of Arthur"
        ],
        "evilList": [
          "Morgana",
          "Assassin",
          "Oberon",
          "Minion of Mordred"
        ]
      }
    }
  },
  {
    "avatarId": 9,
    "name": "道长-944",
    "isReady": true,
    "isDummy": true,
    "isAdmin": false,
    "roleInfo": {
      "roleName": "Servant of Arthur",
      "isEvil": false,
      "specialities": [],
      "description": "You know nothing :)",
      "overviewInfo": {
        "goodList": [
          "Merlin",
          "Percival",
          "Servant of Arthur",
          "Servant of Arthur",
          "Servant of Arthur"
        ],
        "evilList": [
          "Morgana",
          "Assassin",
          "Oberon",
          "Minion of Mordred"
        ]
      }
    }
  },
  {
    "avatarId": 12,
    "name": "BruoMars-472",
    "isReady": true,
    "isDummy": true,
    "isAdmin": false,
    "roleInfo": {
      "roleName": "Minion of Mordred",
      "isEvil": true,
      "specialities": [],
      "description": "You are plain evil, your teammates are",
      "knowPlayers": [
        "笑笑-733",
        "Ming"
      ],
      "overviewInfo": {
        "goodList": [
          "Merlin",
          "Percival",
          "Servant of Arthur",
          "Servant of Arthur",
          "Servant of Arthur"
        ],
        "evilList": [
          "Morgana",
          "Assassin",
          "Oberon",
          "Minion of Mordred"
        ]
      }
    }
  },
  {
    "avatarId": 2,
    "name": "道长-933",
    "isReady": true,
    "isDummy": true,
    "isAdmin": false,
    "roleInfo": {
      "roleName": "Morgana",
      "isEvil": true,
      "specialities": [
        1
      ],
      "description": "You appears as Merlin, your teammates are",
      "overviewInfo": {
        "goodList": [
          "Merlin",
          "Percival",
          "Servant of Arthur",
          "Servant of Arthur",
          "Servant of Arthur"
        ],
        "evilList": [
          "Morgana",
          "Assassin",
          "Oberon",
          "Minion of Mordred"
        ]
      }
    }
  },
  {
    "avatarId": 1,
    "name": "奇葩-617",
    "isReady": true,
    "isDummy": true,
    "isAdmin": false,
    "roleInfo": {
      "roleName": "Servant of Arthur",
      "isEvil": false,
      "specialities": [],
      "description": "You know nothing :)",
      "overviewInfo": {
        "goodList": [
          "Merlin",
          "Percival",
          "Servant of Arthur",
          "Servant of Arthur",
          "Servant of Arthur"
        ],
        "evilList": [
          "Morgana",
          "Assassin",
          "Oberon",
          "Minion of Mordred"
        ]
      }
    }
  },
  {
    "avatarId": 12,
    "name": "Ming",
    "isReady": true,
    "isDummy": false,
    "isAdmin": false,
    "roleInfo": {
      "roleName": "Assassin",
      "isEvil": true,
      "specialities": [
        3
      ],
      "description": "You can kill Merlin, your teammates are",
      "knowPlayers": [
        "笑笑-733",
        "BruoMars-472"
      ],
      "overviewInfo": {
        "goodList": [
          "Merlin",
          "Percival",
          "Servant of Arthur",
          "Servant of Arthur",
          "Servant of Arthur"
        ],
        "evilList": [
          "Morgana",
          "Assassin",
          "Oberon",
          "Minion of Mordred"
        ]
      }
    }
  }
]

export const FAKE_PRE_GAME_STATE = {
  players: fakePlayers,
  myName: 'Admin'
};

export const FAKE_GAME_STATE = {
  gameState: [],
  gameSetup: { rounds: [3, 4, 4, 5, 5], specialRound4: true },
  gameStarted: true
};