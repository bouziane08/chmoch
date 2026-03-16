#!/bin/bash

echo "🚀 رفع المشروع إلى GitHub"

read -p "اسم المستودع في GitHub: " repo

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/bouziane08/$repo.git
git push -u origin main

echo "✅ تم رفع المشروع بنجاح"
echo "🔗 الرابط:"
echo "https://github.com/bouziane08/$repo"
