from fastapi import FastAPI

app = FastAPI(
    title="Account Management API",
    version="1.0.0",
)


@app.get("/api/v1/health")
def health():
    return {"status": "ok"}


@app.get("/api/v1/users")
def get_users():
    users = [
        {
            "id": 1,
            "username": "TIaseVOOnzQX5lwGYbxwPFG8fZIvO6wEdZzUFJZDznRpImx35kgH3YgDt0ARjUyGV/gn",
            "role": "W47NyUDgJhWEP2XOeQyxh37HAan7Q3dbANNKzpc2+HPTBoyoyqGySvdL27DgTg==",
            "department": "FOlHiXdcIL1rJiVkPGT3BAL+w/1rIXKszZkqovdLquCYBbV1T4AExQf8pc5sLKRJtij8hKetV5TvcJ0oUA==",
            "status": "R6MNjJkBCVhDrsMi93Ph2kyvMf9qAE3MM8MZMnkQW2UkmcZG5HlBhMJtDoSt1EQJbhs=",
        },
        {
            "id": 2,
            "username": "QDLNUQKf/yXEa7eY6Kw6rtDIYjq7CCiL0mr7sruhyBobCWt1UCxqEhlTQXVs6sLr1S7h7g==",
            "role": "hyH2jnLPpL+isxgOhrpNKL60UhHZBR7bIFi9iwX3421oAn8o7Yux+nDckvZ2+D4ZBHcG",
            "department": "msBrQl3w6FqtgCVZchJeHtWyoub90u9UJSwHEu+edXqmwtvEYkRzfDI4YHER7VcdUn6ECZgoC6ilfjxg",
            "status": "pqhhJLbclOX665ULR9uXa1Nfy+7FLUL+JoQiG9ZAITSo0QNc88wTlBSF4llSbyRPf6E=",
        },
        {
            "id": 3,
            "username": "VMDGRpUuDxNiDsf7JQzVTF5YzYU3UjQdX4bx5tesL+2KlafGWgoWVzg5zKq+xvHGhW12UiK6",
            "role": "C2nTmzFFY+/4lR/OZNTsYWv18CONTmMkhZZ8ldDaYHNat4NxTQdNujOmQkgwCmmUBg==",
            "department": "N2ekSJ/YmsfQUyAEFS9QLgfGiJBQ+uN/G0Zk+eQhSo7FR23npGAo7P7RyLXFCW/gJNJyHqT6Q11pKFft9LnVmCmL",
            "status": "KPHqD6QGw/PFgZl1dLp6YrZH1yrDmLw8gI7lKeNt0mb+9YSi7gUpsVdlVaZ4PY9xEGc=",
        },
    ]

    flag = "4ZFtOLsL9mNf4vzCkA0viyQfoq6F39pyaV6HODNaJ3F2FGbgG21xKzqJ18ByLTC4GIxzL/0XMxo3ptFavk+6sVhYOHJ/"

    return {
        "status": "ok",
        "users": users,
        "flag": flag,
    }
