import { learningTopics } from "./learningTopics";
import { generateLearningStoryboard } from "./storyboardGenerator";

export const sampleMarketAssets = learningTopics.map((topic, index) => {
    const storyboard = generateLearningStoryboard(topic);
    return {
        asset_id: `market-demo-${index + 1}`,
        type: "storyboard",
        title: topic.title,
        campaign: "Credit Vivo Learning",
        topic: topic.category,
        format: index % 2 === 0 ? "9:16" : "1:1",
        status: index === 0 ? "Approved" : index === 1 ? "Compliance Review" : "Needs Review",
        created_by: "Market AI",
        approved_by: index === 0 ? "Owner" : null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        tags: ["learning", topic.category.toLowerCase().replaceAll(" ", "-"), "credit-vivo"],
        compliance_flags: storyboard.compliance.flags,
        disclosure_included: true,
        source: "Credit Vivo generated",
        version: 1,
        storyboard,
    };
});
