# Stage 1

## Priority Inbox - Notification System Design

## Approach
Notifications are ranked using a priority score based on:
- **Type Weight**: Placement = 3, Result = 2, Event = 1
- **Recency**: More recent notifications rank higher

## Priority Score Formula
score = typeWeight * 1e13 + timestamp

## How Top 10 is Maintained
- Fetch all notifications from API
- Calculate priority score for each notification
- Sort in descending order of score
- Slice top N notifications

## Handling New Notifications
When new notifications arrive, they are re-fetched
and re-sorted so the top 10 always stays updated.