export function canView(story, userId) {
  return story.authorId === userId || story.contributorIds.includes(userId);
}

export function toPublicStory(story) {
  return {
    id: story.id,
    title: story.title,
    content: story.content,
    authorId: story.authorId,
    contributorIds: story.contributorIds,
    commentsEnabled: story.commentsEnabled,
    updatedAt: story.updatedAt,
  };
}
