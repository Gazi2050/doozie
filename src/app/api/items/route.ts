import { connectDB } from '@/libs/connectDB';
import { NextResponse } from 'next/server';

const ONE_HOUR = 60 * 60 * 1000;

export async function POST() {
    try {
        const db = await connectDB();
        const collection = db.collection('items');

        const latestData = await collection.findOne({}, { sort: { fetchedAt: -1 } });

        if (latestData) {
            const now = Date.now();
            const lastFetched = new Date(latestData.fetchedAt).getTime();

            if (now - lastFetched < ONE_HOUR) {
                const minutesLeft = Math.ceil((ONE_HOUR - (now - lastFetched)) / (60 * 1000));
                return NextResponse.json({
                    message: `Hold on . You can fetch again in ${minutesLeft} minutes.`
                });
            }
        }

        const postData = {
            rakuten_query_parameters: {
                keyword: "shirt",
                sort: "-itemPrice",
                hits: 100,
                condition: 1,
                imageFlag: 1,
                shipOverseasFlag: 1,
                shipOverseasArea: "US"
            },
            yahoo_query_parameters: {
                query: "shirt",
                results: 100,
                in_stock: true,
                is_discounted: false,
                sort: "-price",
                condition: 1,
                delivery_area: "13",
                delivery_day: 0,
                delivery_deadline: 24
            },
            from_scheduler: false
        };

        const apiResponse = await fetch('https://api.doozie.shop/v1/items/search', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        if (!apiResponse.ok) {
            throw new Error('Failed to fetch from external API');
        }

        const responseData = await apiResponse.json();

        await collection.insertOne({
            data: responseData,
            fetchedAt: new Date()
        });

        return NextResponse.json({ message: 'Data fetched and saved successfully!' });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const db = await connectDB();
        const collection = db.collection('items');

        const latest = await collection.findOne({}, { sort: { fetchedAt: -1 } });

        return NextResponse.json(latest || {});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch from database.' }, { status: 500 });
    }
}
