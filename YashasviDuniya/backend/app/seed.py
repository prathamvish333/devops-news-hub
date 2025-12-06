from sqlalchemy.orm import Session
from . import models, crud, schemas
from .db import SessionLocal, init_db


SAMPLE_POSTS = [
    {
        "title": "India Launches Ambitious Green Hydrogen Mission to Power Clean Energy Future",
        "summary": "Government unveils ₹19,744 crore initiative to make India a global hub for green hydrogen production and export.",
        "content": """<p>In a landmark move towards sustainable energy, the Indian government has officially launched the National Green Hydrogen Mission with an initial outlay of ₹19,744 crore. The ambitious program aims to position India as a global leader in green hydrogen production and export.</p>
        <p>The mission targets production of 5 million metric tonnes of green hydrogen annually by 2030, with an expected investment of over ₹8 lakh crore. This initiative is expected to create over 6 lakh jobs and reduce fossil fuel imports by ₹1 lakh crore.</p>
        <p>"Green hydrogen represents the future of clean energy, and India is committed to leading this global transition," said the Union Minister for New and Renewable Energy at the launch event in New Delhi.</p>
        <p>Industry experts have welcomed the move, noting that India's abundant renewable energy resources make it an ideal candidate for large-scale green hydrogen production.</p>""",
        "category": "India",
        "tags": ["green hydrogen", "clean energy", "renewable", "government"],
        "image_url": "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800"
    },
    {
        "title": "Global Tech Leaders Gather at Davos to Address AI Governance Challenges",
        "summary": "World Economic Forum sees unprecedented focus on artificial intelligence regulation and ethical frameworks.",
        "content": """<p>The World Economic Forum's annual meeting at Davos has placed artificial intelligence governance at the center of global discussions, with tech CEOs, policymakers, and academics converging to address the rapid advancement of AI technology.</p>
        <p>Key topics include the need for international regulatory frameworks, ethical AI deployment, and the impact on global employment. Several major tech companies announced collaborative initiatives to develop responsible AI guidelines.</p>
        <p>"We are at a pivotal moment in human history. The decisions we make about AI governance today will shape our civilization for generations," remarked a prominent tech leader during a panel discussion.</p>
        <p>The forum also saw the announcement of a new international AI safety consortium, bringing together governments and private sector players from over 30 countries.</p>""",
        "category": "World",
        "tags": ["AI", "Davos", "WEF", "technology", "governance"],
        "image_url": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800"
    },
    {
        "title": "Sensex Surges Past 75,000 Mark as Foreign Investors Return to Indian Markets",
        "summary": "Indian stock markets hit all-time high amid strong GDP growth projections and renewed FII confidence.",
        "content": """<p>The BSE Sensex crossed the historic 75,000 mark for the first time, driven by strong foreign institutional investor (FII) inflows and positive economic indicators. The benchmark index closed at 75,234 points, gaining over 500 points in a single trading session.</p>
        <p>Banking, IT, and energy stocks led the rally, with several blue-chip companies touching 52-week highs. Market analysts attribute the surge to India's robust GDP growth forecast of 7.2% for the current fiscal year.</p>
        <p>"India's economic fundamentals remain strong, and global investors are recognizing the long-term growth potential of Indian markets," said a senior analyst at a leading brokerage firm.</p>
        <p>The Nifty 50 also hit a new record, closing above 22,800 points. Mid-cap and small-cap indices followed suit, reflecting broad-based market optimism.</p>""",
        "category": "Business",
        "tags": ["Sensex", "stock market", "FII", "economy", "investment"],
        "image_url": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800"
    },
    {
        "title": "Breakthrough Quantum Computing Chip Achieves Error Correction Milestone",
        "summary": "Scientists demonstrate practical quantum error correction, bringing fault-tolerant quantum computers closer to reality.",
        "content": """<p>Researchers have achieved a major breakthrough in quantum computing by demonstrating practical quantum error correction on a new chip architecture. The development marks a significant step toward building fault-tolerant quantum computers capable of solving real-world problems.</p>
        <p>The new chip uses a novel approach to error correction that reduces the overhead typically required for quantum error correction by a factor of ten. This makes large-scale quantum computing more feasible with current technology.</p>
        <p>"This is a watershed moment for quantum computing. We've shown that practical error correction is achievable, which opens the door to truly useful quantum computers," explained the lead researcher.</p>
        <p>The breakthrough has implications for drug discovery, climate modeling, cryptography, and optimization problems that are intractable for classical computers.</p>""",
        "category": "Tech",
        "tags": ["quantum computing", "technology", "innovation", "research"],
        "image_url": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800"
    },
    {
        "title": "Indian Cricket Team Clinches Historic Series Win in Australia",
        "summary": "Team India defeats Australia 3-1 in Test series, retaining the Border-Gavaskar Trophy for the fourth consecutive time.",
        "content": """<p>The Indian cricket team has etched another golden chapter in the nation's sporting history by defeating Australia 3-1 in the Test series Down Under. This marks the fourth consecutive Border-Gavaskar Trophy win for India, a feat unprecedented in the annals of India-Australia cricket.</p>
        <p>The series-deciding match at the Sydney Cricket Ground saw India chase down a target of 328 runs, with several young players stepping up when it mattered most. The pace bowling attack was particularly impressive throughout the series.</p>
        <p>"This team has shown incredible character and belief. To win in Australia repeatedly shows the depth and talent in Indian cricket," the captain said in his post-match interview.</p>
        <p>Cricket fans across India celebrated into the night, with major cities witnessing spontaneous gatherings and celebrations.</p>""",
        "category": "Sports",
        "tags": ["cricket", "India", "Australia", "Border-Gavaskar Trophy", "Test series"],
        "image_url": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800"
    },
    {
        "title": "Pan-Indian Film 'Celestial Warriors' Breaks All Box Office Records",
        "summary": "Multi-lingual epic becomes the highest-grossing Indian film ever, crossing ₹2000 crore worldwide.",
        "content": """<p>The pan-Indian epic 'Celestial Warriors' has shattered all box office records, becoming the highest-grossing Indian film in history. Released simultaneously in Hindi, Telugu, Tamil, Malayalam, and Kannada, the film has crossed ₹2000 crore in worldwide collections within its first month.</p>
        <p>The visual spectacle, which blends mythology with cutting-edge technology, has been praised for its groundbreaking visual effects and compelling storytelling. International markets, particularly in North America and the Middle East, have contributed significantly to the collections.</p>
        <p>"This film proves that Indian cinema can compete on the global stage with any Hollywood production," said a noted film critic.</p>
        <p>The film's success has sparked discussions about the growing influence of Indian cinema worldwide and the potential for more big-budget pan-Indian productions.</p>""",
        "category": "Entertainment",
        "tags": ["Bollywood", "film", "box office", "cinema", "entertainment"],
        "image_url": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800"
    },
    {
        "title": "ISRO Successfully Tests Next-Generation Reusable Launch Vehicle",
        "summary": "India's space agency achieves key milestone in developing cost-effective space transportation system.",
        "content": """<p>The Indian Space Research Organisation (ISRO) has successfully conducted a crucial test flight of its Reusable Launch Vehicle (RLV) technology demonstrator. The test marks a significant advancement in India's quest to develop cost-effective access to space.</p>
        <p>The vehicle was launched from Sriharikota and successfully demonstrated autonomous landing capabilities after atmospheric re-entry. This technology could reduce the cost of space launches by up to 80%.</p>
        <p>"This test validates our approach to reusable space transportation. It brings us closer to making space access more affordable for India and the world," said the ISRO chairman.</p>
        <p>The development puts India in an elite group of nations working on reusable rocket technology, alongside the United States and China.</p>""",
        "category": "India",
        "tags": ["ISRO", "space", "technology", "rocket", "India"],
        "image_url": "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800"
    },
    {
        "title": "European Union Announces Landmark Climate Finance Package for Developing Nations",
        "summary": "EU commits €100 billion annually to help developing countries transition to clean energy.",
        "content": """<p>The European Union has announced a groundbreaking climate finance package, committing €100 billion annually to support developing nations in their transition to clean energy. The initiative aims to address the growing climate financing gap identified by global environmental organizations.</p>
        <p>The package includes grants, concessional loans, and technical assistance programs targeting renewable energy infrastructure, climate adaptation projects, and green technology transfer.</p>
        <p>"Climate change is a global challenge that requires global solutions. This package demonstrates Europe's commitment to supporting our partners in the Global South," said the EU Climate Commissioner.</p>
        <p>Environmental groups have cautiously welcomed the announcement while calling for clear implementation timelines and accountability mechanisms.</p>""",
        "category": "World",
        "tags": ["climate change", "EU", "environment", "finance", "sustainability"],
        "image_url": "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800"
    },
    {
        "title": "Indian Startups Raise Record $50 Billion in 2024, Unicorn Count Crosses 150",
        "summary": "Indian startup ecosystem shows resilience with strong funding momentum despite global economic headwinds.",
        "content": """<p>India's startup ecosystem has defied global economic challenges, with Indian startups raising a record $50 billion in funding during 2024. The country's unicorn count has crossed 150, cementing India's position as the third-largest startup hub globally.</p>
        <p>Deep-tech, climate-tech, and B2B SaaS sectors attracted the most investment, with several startups achieving valuations above $5 billion. Tier-2 and Tier-3 cities have emerged as significant contributors to the startup boom.</p>
        <p>"The Indian startup story is maturing. We're seeing more sustainable businesses with clear paths to profitability," noted a prominent venture capitalist.</p>
        <p>The government's Startup India initiative and improved digital infrastructure have been credited as key enablers of this growth.</p>""",
        "category": "Business",
        "tags": ["startups", "investment", "unicorn", "entrepreneurship", "technology"],
        "image_url": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800"
    },
    {
        "title": "Scientists Develop Revolutionary Gene Therapy for Rare Genetic Disorders",
        "summary": "New CRISPR-based treatment shows promise in treating previously incurable hereditary conditions.",
        "content": """<p>Medical researchers have developed a groundbreaking gene therapy using advanced CRISPR technology that has shown remarkable success in treating rare genetic disorders. Clinical trials have demonstrated complete remission in patients with conditions previously considered incurable.</p>
        <p>The therapy works by precisely editing disease-causing genes at their source, potentially offering one-time treatments for conditions that currently require lifelong management. Early trials have focused on blood disorders and muscular dystrophies.</p>
        <p>"We are witnessing the dawn of a new era in medicine where we can address the root cause of genetic diseases rather than just managing symptoms," said the lead researcher.</p>
        <p>Regulatory agencies in multiple countries are expediting review processes for this promising therapy, with potential approvals expected within the next year.</p>""",
        "category": "Tech",
        "tags": ["gene therapy", "CRISPR", "medical", "health", "biotechnology"],
        "image_url": "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800"
    }
]


def seed_database():
    """Seed the database with initial data"""
    init_db()
    db = SessionLocal()
    
    try:
        # Check if admin already exists
        existing_admin = crud.get_user_by_username(db, "admin")
        if existing_admin:
            print("Database already seeded. Skipping...")
            return
        
        # Create admin user
        admin_user = schemas.UserCreate(
            username="admin",
            email="admin@yashasviduniya.com",
            password="admin",
            full_name="Administrator"
        )
        db_admin = crud.create_user(db, admin_user, is_admin=True)
        print(f"Created admin user: {db_admin.username}")
        
        # Create sample posts
        for post_data in SAMPLE_POSTS:
            post = schemas.PostCreate(**post_data)
            db_post = crud.create_post(db, post, db_admin.id)
            print(f"Created post: {db_post.title[:50]}...")
        
        print(f"\nSeeding complete! Created {len(SAMPLE_POSTS)} sample posts.")
        print("Default credentials: admin / admin")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
