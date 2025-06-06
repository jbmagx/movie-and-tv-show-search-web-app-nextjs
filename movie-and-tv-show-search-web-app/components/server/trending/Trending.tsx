import TrendingToday from './components/TrendingToday';
import TrendingThisWeek from './components/TrendingThisWeek';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Trending() {
    return (
        <Tabs defaultValue="today" className="w-full">
            <div className="flex items-center gap-x-2.5">
                <h2 className="font-semibold text-xl">Trending</h2>

                <TabsList>
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="thisWeek">This Week</TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="today">
                <TrendingToday />
            </TabsContent>
            <TabsContent value="thisWeek">
                <TrendingThisWeek />
            </TabsContent>
        </Tabs>
    );
}
