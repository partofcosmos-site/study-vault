export const problems = [
    {
        "id": "phys-001",
        "title": "Projectile Motion: Maximum Range on Inclined Plane",
        "subject": "Physics",
        "topic": "Kinematics",
        "difficulty": "Hard",
        "solvedCount": 1450,
        "tags": [
            "JEE Advanced",
            "Mechanics",
            "Projectile"
        ],
        "statement": "A projectile is fired with velocity u at an angle alpha with the horizontal up an inclined plane of inclination beta. Find the condition for the range on the inclined plane to be maximum.",
        "solutions": [
            {
                "method": "Analytical Method",
                "content": "Range R = (2u² sin(α-β) cos(α)) / (g cos²β). For max range, dR/dα = 0. This gives α = π/4 + β/2."
            }
        ]
    },
    {
        "id": "math-001",
        "title": "Definite Integration of Fractional Part Function",
        "subject": "Math",
        "topic": "Calculus",
        "difficulty": "Medium",
        "solvedCount": 2100,
        "tags": [
            "JEE Main",
            "Integration",
            "Functions"
        ],
        "statement": "Evaluate the integral from 0 to 10 of {x} dx, where {x} denotes the fractional part of x.",
        "solutions": [
            {
                "method": "Graphical Method",
                "content": "{x} is a periodic function with period 1. The area under one period (triangle base 1, height 1) is 1/2. Since we have 10 periods, Total Area = 10 * (1/2) = 5."
            }
        ]
    },
    {
        "id": "phys-002",
        "title": "Moment of Inertia of a Hollow Sphere",
        "subject": "Physics",
        "topic": "Rotation",
        "difficulty": "Medium",
        "solvedCount": 1890,
        "tags": [
            "NEET",
            "Mechanics",
            "Rotation"
        ],
        "statement": "Derive the moment of inertia of a thin hollow sphere of mass M and radius R about its diameter.",
        "solutions": [
            {
                "method": "Integration",
                "content": "Consider elementary rings. I = (2/3)MR²."
            }
        ]
    },
    {
        "id": "math-002",
        "title": "Complex Numbers: Cube Roots of Unity",
        "subject": "Math",
        "topic": "Algebra",
        "difficulty": "Easy",
        "solvedCount": 3200,
        "tags": [
            "JEE Main",
            "Complex Numbers"
        ],
        "statement": "If 1, ω, ω² are the cube roots of unity, then find the value of (1 + ω - ω²)(1 - ω + ω²).",
        "solutions": [
            {
                "method": "Properties of Omega",
                "content": "Use 1 + ω + ω² = 0. (1+ω-ω²) = (-ω²-ω²) = -2ω². (1-ω+ω²) = (-ω-ω) = -2ω. Product = 4ω³ = 4."
            }
        ]
    },
    {
        "id": "phys-003",
        "title": "Carnot Engine Efficiency Calculation",
        "subject": "Physics",
        "topic": "Thermodynamics",
        "difficulty": "Easy",
        "solvedCount": 2500,
        "tags": [
            "NEET",
            "Thermodynamics"
        ],
        "statement": "A Carnot engine works between temperatures 300K and 600K. Calculate its efficiency.",
        "solutions": [
            {
                "method": "Formula",
                "content": "Efficiency η = 1 - (T_cold / T_hot) = 1 - (300/600) = 1 - 0.5 = 0.5 or 50%."
            }
        ]
    },
    {
        "id": "math-003",
        "title": "Probability: Bayes' Theorem Application",
        "subject": "Math",
        "topic": "Probability",
        "difficulty": "Hard",
        "solvedCount": 980,
        "tags": [
            "JEE Advanced",
            "Probability"
        ],
        "statement": "Box I contains 2 red and 3 blue balls. Box II contains 3 red and 4 blue balls. One box is selected at random and a ball is drawn. If the ball is red, what is the probability it came from Box I?",
        "solutions": [
            {
                "method": "Bayes' Theorem",
                "content": "P(I|R) = (P(R|I)P(I)) / (P(R|I)P(I) + P(R|II)P(II)). P(R|I)=2/5, P(R|II)=3/7. P(I)=P(II)=1/2. Result ≈ 0.48."
            }
        ]
    },
    {
        "id": "phys-004",
        "title": "Electrostatics: Field due to Ring",
        "subject": "Physics",
        "topic": "Electrostatics",
        "difficulty": "Medium",
        "solvedCount": 1600,
        "tags": [
            "JEE Main",
            "Electrostatics"
        ],
        "statement": "Calculate the electric field at a distance x from the center of a charged ring of radius R carrying charge Q on its axis.",
        "solutions": [
            {
                "method": "Integration",
                "content": "E = (kQx) / (R² + x²)^(3/2). Max field occurs at x = R/√2."
            }
        ]
    },
    {
        "id": "math-004",
        "title": "Limits: L'Hopital's Rule",
        "subject": "Math",
        "topic": "Calculus",
        "difficulty": "Easy",
        "solvedCount": 4100,
        "tags": [
            "JEE Main",
            "Calculus"
        ],
        "statement": "Find limit x->0 of (sin x - x) / x³.",
        "solutions": [
            {
                "method": "Series Expansion",
                "content": "sin x = x - x³/3! + ... So (sin x - x)/x³ = -1/6."
            },
            {
                "method": "L'Hopital",
                "content": "Differentiate num and den 3 times to get -cos(0)/6 = -1/6."
            }
        ]
    },
    {
        "id": "phys-005",
        "title": "Doppler Effect in Sound",
        "subject": "Physics",
        "topic": "Waves",
        "difficulty": "Medium",
        "solvedCount": 2200,
        "tags": [
            "NEET",
            "Waves"
        ],
        "statement": "A source frequency 500Hz moves towards a stationary observer with velocity v/10. Find apparent frequency.",
        "solutions": [
            {
                "method": "Formula",
                "content": "f' = f (v / (v - vs)) = 500 (v / (0.9v)) = 5000/9 ≈ 555.5 Hz."
            }
        ]
    },
    {
        "id": "math-005",
        "title": "Matrices: Cayley-Hamilton Theorem",
        "subject": "Math",
        "topic": "Algebra",
        "difficulty": "Hard",
        "solvedCount": 1100,
        "tags": [
            "JEE Advanced",
            "Matrices"
        ],
        "statement": "Find the inverse of matrix A = [[1, 2], [3, 4]] using Cayley-Hamilton theorem.",
        "solutions": [
            {
                "method": "Characteristic Equation",
                "content": "Ch Eq: λ² - 5λ - 2 = 0. So A² - 5A - 2I = 0. Multiply by A⁻¹: A - 5I - 2A⁻¹ = 0. A⁻¹ = 0.5(A - 5I)."
            }
        ]
    },
    {
        "id": "phys-006",
        "title": "Optics: Young's Double Slit Experiment",
        "subject": "Physics",
        "topic": "Optics",
        "difficulty": "Medium",
        "solvedCount": 2700,
        "tags": [
            "JEE Main",
            "Optics"
        ],
        "statement": "In YDSE, separation d=1mm, Screen D=1m, Wavelength=500nm. Find fringe width.",
        "solutions": [
            {
                "method": "Formula",
                "content": "β = (λD)/d = (500e-9 * 1) / 1e-3 = 5e-4 m = 0.5 mm."
            }
        ]
    },
    {
        "id": "math-006",
        "title": "Differential Equations: Bernoulli's Equation",
        "subject": "Math",
        "topic": "Calculus",
        "difficulty": "Hard",
        "solvedCount": 800,
        "tags": [
            "JEE Advanced",
            "Differential Equations"
        ],
        "statement": "Solve dy/dx + y/x = y².",
        "solutions": [
            {
                "method": "Reduction to Linear",
                "content": "Divide by y², diff, substitute v = 1/y. Reduces to linear form dv/dx - v/x = -1."
            }
        ]
    },
    {
        "id": "phys-007",
        "title": "Fluid Mechanics: Bernoulli's Principle",
        "subject": "Physics",
        "topic": "Fluids",
        "difficulty": "Easy",
        "solvedCount": 3000,
        "tags": [
            "NEET",
            "Fluids"
        ],
        "statement": "Water flows through a horizontal pipe. At a point where velocity is v, pressure is P. Find P if velocity becomes 2v.",
        "solutions": [
            {
                "method": "Bernoulli",
                "content": "P + 0.5ρv² = P' + 0.5ρ(2v)². P' = P - 1.5ρv²."
            }
        ]
    },
    {
        "id": "math-007",
        "title": "Vectors: Scalar Triple Product",
        "subject": "Math",
        "topic": "Vectors",
        "difficulty": "Medium",
        "solvedCount": 1500,
        "tags": [
            "JEE Main",
            "Vectors"
        ],
        "statement": "Find the volume of potential parallelepiped with edges i+j, j+k, k+i.",
        "solutions": [
            {
                "method": "Determinant",
                "content": "Box product [a b c] = 2. Volume = 2 cubic units."
            }
        ]
    },
    {
        "id": "phys-008",
        "title": "AC Circuits: LCR Resonance",
        "subject": "Physics",
        "topic": "Electromagnetism",
        "difficulty": "Medium",
        "solvedCount": 2300,
        "tags": [
            "JEE Main",
            "AC Circuits"
        ],
        "statement": "Find resonant frequency of LCR circuit with L=1H, C=1μF.",
        "solutions": [
            {
                "method": "Formula",
                "content": "ω = 1/√(LC) = 1/√(1e-6) = 1000 rad/s."
            }
        ]
    },
    {
        "id": "math-008",
        "title": "Permutations: Dictionary Rank",
        "subject": "Math",
        "topic": "Algebra",
        "difficulty": "Medium",
        "solvedCount": 1800,
        "tags": [
            "JEE Main",
            "Permutations"
        ],
        "statement": "Find the rank of the word 'MOTHER' in a dictionary.",
        "solutions": [
            {
                "method": "Factorial Counting",
                "content": "Alphabetical: E, H, M, O, R, T. M is 3rd. 2*5! + ... Rank = 309."
            }
        ]
    },
    {
        "id": "phys-009",
        "title": "Modern Physics: Photoelectric Effect",
        "subject": "Physics",
        "topic": "Modern Physics",
        "difficulty": "Easy",
        "solvedCount": 3500,
        "tags": [
            "NEET",
            "Modern Physics"
        ],
        "statement": "If threshold wavelength is 600nm, find work function.",
        "solutions": [
            {
                "method": "Formula",
                "content": "φ = hc/λ = 1240 / 600 eV ≈ 2.07 eV."
            }
        ]
    },
    {
        "id": "math-009",
        "title": "Conic Sections: Tangent to Parabola",
        "subject": "Math",
        "topic": "Coordinate Geometry",
        "difficulty": "Medium",
        "solvedCount": 1900,
        "tags": [
            "JEE Main",
            "Conic Sections"
        ],
        "statement": "Find condition for y = mx + c to be tangent to y² = 4ax.",
        "solutions": [
            {
                "method": "Discriminant",
                "content": "Substitute y, D=0. c = a/m."
            }
        ]
    },
    {
        "id": "phys-010",
        "title": "SHM: Time Period of Pendulum",
        "subject": "Physics",
        "topic": "Oscillations",
        "difficulty": "Easy",
        "solvedCount": 3800,
        "tags": [
            "NEET",
            "SHM"
        ],
        "statement": "A pendulum of length 1m on Earth. Find its time period.",
        "solutions": [
            {
                "method": "Formula",
                "content": "T = 2π√(l/g) ≈ 2π√(1/10) ≈ 2 seconds."
            }
        ]
    },
    {
        "id": "math-010",
        "title": "Sequence and Series: AP Sum",
        "subject": "Math",
        "topic": "Algebra",
        "difficulty": "Easy",
        "solvedCount": 4200,
        "tags": [
            "JEE Main",
            "Sequence & Series"
        ],
        "statement": "Find sum of first 50 natural numbers.",
        "solutions": [
            {
                "method": "Formula",
                "content": "S = n(n+1)/2 = 50*51/2 = 1275."
            }
        ]
    },
    {
        "id": "phys-020",
        "title": "Gravitation: Escape Velocity",
        "subject": "Physics",
        "topic": "Gravitation",
        "difficulty": "Easy",
        "solvedCount": 3100,
        "tags": [
            "NEET",
            "Gravitation"
        ],
        "statement": "Calculate escape velocity from a planet with mass 2M and radius R/2, where M, R are Earth's mass and radius.",
        "solutions": [
            {
                "method": "Formula Comparison",
                "content": "v_e = √(2GM/R). v' = √(2G(2M)/(R/2)) = √(8GM/R) = 2√(2GM/R) = 2v_e = 22.4 km/s."
            }
        ]
    },
    {
        "id": "math-020",
        "title": "Vector Algebra: Projection",
        "subject": "Math",
        "topic": "Vectors",
        "difficulty": "Easy",
        "solvedCount": 3900,
        "tags": [
            "JEE Main",
            "Vectors"
        ],
        "statement": "Find the projection of vector a = 2i + 3j + 2k on vector b = i + 2j + k.",
        "solutions": [
            {
                "method": "Formula",
                "content": "Proj = (a.b)/|b| = (2*1 + 3*2 + 2*1) / √(1+4+1) = 10/√6."
            }
        ]
    },
    {
        "id": "phys-021",
        "title": "Current Electricity: Wheatstone Bridge",
        "subject": "Physics",
        "topic": "Electricity",
        "difficulty": "Medium",
        "solvedCount": 2400,
        "tags": [
            "JEE Main",
            "Current Electricity"
        ],
        "statement": "In a balanced Wheatstone bridge, P=10, Q=20, R=5. Find S.",
        "solutions": [
            {
                "method": "Balance Condition",
                "content": "P/Q = R/S => 10/20 = 5/S => S = 10 ohms."
            }
        ]
    },
    {
        "id": "math-021",
        "title": "3D Geometry: Shortest Distance",
        "subject": "Math",
        "topic": "3D Geometry",
        "difficulty": "Hard",
        "solvedCount": 1300,
        "tags": [
            "JEE Advanced",
            "3D Geometry"
        ],
        "statement": "Find the shortest distance between skew lines r = a + λb and r = c + μd.",
        "solutions": [
            {
                "method": "Vector Formula",
                "content": "d = |(c-a).(b x d)| / |b x d|."
            }
        ]
    },
    {
        "id": "phys-022",
        "title": "Magnetism: Force on Wire",
        "subject": "Physics",
        "topic": "Magnetism",
        "difficulty": "Medium",
        "solvedCount": 2000,
        "tags": [
            "NEET",
            "Magnetism"
        ],
        "statement": "A wire of length L carrying current I is placed in uniform B perpendicular to it. Find force.",
        "solutions": [
            {
                "method": "Formula",
                "content": "F = ILB sin(90) = ILB."
            }
        ]
    },
    {
        "id": "math-022",
        "title": "Statistics: Variance",
        "subject": "Math",
        "topic": "Statistics",
        "difficulty": "Medium",
        "solvedCount": 1700,
        "tags": [
            "JEE Main",
            "Statistics"
        ],
        "statement": "Find variance of first n natural numbers.",
        "solutions": [
            {
                "method": "Formula",
                "content": "Var = (n² - 1)/12."
            }
        ]
    },
    {
        "id": "phys-023",
        "title": "Ray Optics: Prism deviation",
        "subject": "Physics",
        "topic": "Optics",
        "difficulty": "Easy",
        "solvedCount": 2800,
        "tags": [
            "JEE Main",
            "Optics"
        ],
        "statement": "For a thin prism of angle A and refractive index μ, find deviation.",
        "solutions": [
            {
                "method": "Formula",
                "content": "δ = (μ - 1)A."
            }
        ]
    },
    {
        "id": "math-023",
        "title": "Relations: Equivalence",
        "subject": "Math",
        "topic": "Relations",
        "difficulty": "Easy",
        "solvedCount": 4000,
        "tags": [
            "JEE Main",
            "Relations"
        ],
        "statement": "Is the relation R = {(a,b): a - b is integer} an equivalence relation?",
        "solutions": [
            {
                "method": "Check Properties",
                "content": "Reflexive: a-a=0 (int). Symmetric: a-b int => b-a int. Transitive: a-b, b-c int => a-c int. Yes."
            }
        ]
    },
    {
        "id": "phys-024",
        "title": "Modern Physics: Half Life",
        "subject": "Physics",
        "topic": "Nuclear Physics",
        "difficulty": "Easy",
        "solvedCount": 3300,
        "tags": [
            "NEET",
            "Modern Physics"
        ],
        "statement": "If half life is T, how much sample remains after 2T?",
        "solutions": [
            {
                "method": "Logic",
                "content": "After T: 50%. After 2T: 25% or 1/4th."
            }
        ]
    },
    {
        "id": "math-024",
        "title": "Inverse Trig: Principal Value",
        "subject": "Math",
        "topic": "Trigonometry",
        "difficulty": "Medium",
        "solvedCount": 2200,
        "tags": [
            "JEE Main",
            "Inverse Trig"
        ],
        "statement": "Find principal value of sin⁻¹(sin(2π/3)).",
        "solutions": [
            {
                "method": "Range Check",
                "content": "Range is [-π/2, π/2]. 2π/3 is outside. sin(2π/3) = sin(π - π/3) = sin(π/3). So yield π/3."
            }
        ]
    },
    {
        "id": "phys-025",
        "title": "Semiconductors: Logic Gates",
        "subject": "Physics",
        "topic": "Semiconductors",
        "difficulty": "Easy",
        "solvedCount": 4200,
        "tags": [
            "JEE Main",
            "Semiconductors"
        ],
        "statement": "Identify the gate: Y = NOT(A AND B).",
        "solutions": [
            {
                "method": "Definition",
                "content": "NAND Gate."
            }
        ]
    },
    {
        "id": "math-025",
        "title": "Matrices: Transpose Properties",
        "subject": "Math",
        "topic": "Algebra",
        "difficulty": "Easy",
        "solvedCount": 3800,
        "tags": [
            "JEE Main",
            "Matrices"
        ],
        "statement": "If A is symmetric, what is A - A^T?",
        "solutions": [
            {
                "method": "Definition",
                "content": "A^T = A. So A - A = 0 (Null Matrix)."
            }
        ]
    },
    {
        "id": "phys-026",
        "title": "Thermodynamics: Work Done",
        "subject": "Physics",
        "topic": "Thermodynamics",
        "difficulty": "Medium",
        "solvedCount": 1900,
        "tags": [
            "JEE Main",
            "Thermodynamics"
        ],
        "statement": "Calculate work done in isothermal expansion from V1 to V2.",
        "solutions": [
            {
                "method": "Integration",
                "content": "W = nRT ln(V2/V1)."
            }
        ]
    },
    {
        "id": "math-026",
        "title": "Continuity and Differentiability",
        "subject": "Math",
        "topic": "Calculus",
        "difficulty": "Medium",
        "solvedCount": 2100,
        "tags": [
            "JEE Main",
            "Calculus"
        ],
        "statement": "Check continuity of f(x) = |x| at x=0.",
        "solutions": [
            {
                "method": "Limits",
                "content": "LHL = RHL = f(0) = 0. Continuous."
            }
        ]
    },
    {
        "id": "phys-027",
        "title": "Waves: Standing Waves",
        "subject": "Physics",
        "topic": "Waves",
        "difficulty": "Hard",
        "solvedCount": 1200,
        "tags": [
            "JEE Advanced",
            "Waves"
        ],
        "statement": "String fixed at both ends oscillates in 3rd harmonic. How many nodes?",
        "solutions": [
            {
                "method": "Counting",
                "content": "3 loops. Nodes at ends + 2 between. Total 4 nodes."
            }
        ]
    },
    {
        "id": "math-027",
        "title": "Binomial Theorem: Middle Term",
        "subject": "Math",
        "topic": "Algebra",
        "difficulty": "Medium",
        "solvedCount": 2600,
        "tags": [
            "JEE Main",
            "Binomial Theorem"
        ],
        "statement": "Find middle term in (1 + x)^10.",
        "solutions": [
            {
                "method": "Formula",
                "content": "n=10 (even). Middle term is (n/2 + 1) = 6th term. T6 = 10C5 x^5."
            }
        ]
    },
    {
        "id": "phys-028",
        "title": "Capacitance: Energy Stored",
        "subject": "Physics",
        "topic": "Electrostatics",
        "difficulty": "Easy",
        "solvedCount": 3400,
        "tags": [
            "NEET",
            "Electrostatics"
        ],
        "statement": "Energy stored in capacitor C charged to V.",
        "solutions": [
            {
                "method": "Formula",
                "content": "U = 1/2 CV²."
            }
        ]
    },
    {
        "id": "math-028",
        "title": "Circles: Tangent Condition",
        "subject": "Math",
        "topic": "Coordinate Geometry",
        "difficulty": "Medium",
        "solvedCount": 2300,
        "tags": [
            "JEE Main",
            "Circles"
        ],
        "statement": "Condition for y = mx + c to touch x² + y² = a².",
        "solutions": [
            {
                "method": "Distance Formula",
                "content": "Perpendicular distance from center (0,0) equals radius a. c² = a²(1 + m²)."
            }
        ]
    },
    {
        "id": "phys-029",
        "title": "Collision: Elastic Head On",
        "subject": "Physics",
        "topic": "Mechanics",
        "difficulty": "Medium",
        "solvedCount": 2500,
        "tags": [
            "JEE Main",
            "Collision"
        ],
        "statement": "Two equal masses, one at rest, undergo elastic head-on collision. Velocities after?",
        "solutions": [
            {
                "method": "Property",
                "content": "Velocities are exchanged. First stops, second moves with v."
            }
        ]
    },
    {
        "id": "math-029",
        "title": "Linear Programming: Maximize Z",
        "subject": "Math",
        "topic": "Optimization",
        "difficulty": "Easy",
        "solvedCount": 4500,
        "tags": [
            "Board",
            "LPP"
        ],
        "statement": "Maximize Z = 3x + 4y subject to x + y <= 4, x, y >= 0.",
        "solutions": [
            {
                "method": "Corner Point",
                "content": "Points: (0,0), (4,0), (0,4). Z values: 0, 12, 16. Max is 16 at (0,4)."
            }
        ]
    },
    {
        "id": "phys-030",
        "title": "Units and Dimensions",
        "subject": "Physics",
        "topic": "Basics",
        "difficulty": "Easy",
        "solvedCount": 5000,
        "tags": [
            "NEET",
            "Units"
        ],
        "statement": "Dimension of Planck's constant h.",
        "solutions": [
            {
                "method": "Formula",
                "content": "E = hν => h = E/ν. [ML²T⁻²] / [T⁻¹] = [ML²T⁻¹]."
            }
        ]
    }
];
