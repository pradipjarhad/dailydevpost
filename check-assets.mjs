import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.mdx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

async function checkAssets() {
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    const posts = getAllFiles(postsDir, []);
    let errors = 0;

    console.log(`Checking ${posts.length} posts for broken asset links...`);

    for (const post of posts) {
        const content = fs.readFileSync(post, 'utf8');
        const { data } = matter(content);

        if (data.thumbnail) {
            const thumbPath = path.join(process.cwd(), 'public', data.thumbnail);
            if (!fs.existsSync(thumbPath)) {
                console.error(`[MISSING THUMBNAIL] ${path.relative(process.cwd(), post)}: ${data.thumbnail}`);
                errors++;
            }
        }

        if (data.images) {
            const images = Array.isArray(data.images) ? data.images : [data.images];
            for (const img of images) {
                if (img.startsWith('http')) continue;
                const imgPath = path.join(process.cwd(), 'public', img);
                if (!fs.existsSync(imgPath)) {
                    console.error(`[MISSING IMAGE] ${path.relative(process.cwd(), post)}: ${img}`);
                    errors++;
                }
            }
        }
    }

    if (errors === 0) {
        console.log('All assets verified successfully.');
    } else {
        console.log(`Found ${errors} missing assets.`);
    }
}

checkAssets();
