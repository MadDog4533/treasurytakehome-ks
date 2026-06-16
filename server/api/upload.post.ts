import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export default defineEventHandler(async (event) => {

    const parts = await readMultipartFormData(event);

    console.log('parts:', parts);

    if (!parts) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No files received',
        });
    }

    const uploadDir = join(process.cwd(), 'uploads');
    await mkdir(uploadDir, { recursive: true });

    for (const part of parts) {
        if (part.filename) {
            await writeFile(
                join(uploadDir, part.filename),
                part.data
            );
        }
    }

    return { success: true };
})