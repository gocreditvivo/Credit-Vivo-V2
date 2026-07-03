import { creditVivoBrandKit } from "./brandKit";
import { checkMarketingCompliance } from "./complianceRules";

export function generateLearningStoryboard(topic) {
    const scenes = [
        [1, "0:00-0:15", topic.hook, "Animated Credit Vivo dashboard opening"],
        [2, "0:15-0:30", "Start with your reports", "Three bureau cards: Equifax, Experian, TransUnion"],
        [3, "0:30-0:45", "Credit Vivo scans for review", "AI scan animation over report cards"],
        [4, "0:45-1:00", "Compare the bureaus", "3-bureau comparison table"],
        [5, "1:00-1:15", "Focus on negative accounts", "Negative account cards sort by issue type"],
        [6, "1:15-1:30", "Build focused rounds", "Round 1, Round 2, follow-up timeline"],
        [7, "1:30-1:45", "Attach the proof", "Packet layers: letter, comparison, report pages, evidence"],
        [8, "1:45-2:00", "Customer approval", "Review and approve button"],
        [9, "2:00-2:15", "Track every step", "Mail tracking timeline"],
        [10, "2:15-2:30", "Refresh your scan", "Upload new report cards"],
        [11, "2:30-2:45", "Know the next step", "Dashboard next-step card"],
        [12, "2:45-3:00", creditVivoBrandKit.trustLine, "Credit Vivo final dashboard card"],
    ].map(([scene, time, headline, visual]) => ({
        scene,
        time,
        headline,
        visual,
        motion: scene === 4 ? "Rows highlight balance, status, and date" : "Soft slide and fade",
        narration: scene === 12 ? `${creditVivoBrandKit.trustLine}. ${creditVivoBrandKit.slogan}.` : headline,
    }));

    return {
        topic_id: topic.id,
        title: topic.title,
        duration: topic.duration,
        brand: creditVivoBrandKit.brandName,
        scenes,
        compliance: checkMarketingCompliance(JSON.stringify(scenes)),
    };
}
