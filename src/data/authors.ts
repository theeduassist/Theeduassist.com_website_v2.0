export type AuthorId = "editorial-team";

export interface Author {
  id: AuthorId;
  name: string;
  slug: string;
  role: string;
  shortBio: string;
  fullBio: string;
  profileImage: string;
  profileImageAlt: string;
  areasOfExpertise: string[];
  organization: string;
  publicVisibility: boolean;
  schemaType: "Person" | "Organization";
  contentReviewRole: string;
}

export const authors: Author[] = [
  {
    id: "editorial-team",
    name: "TheEduAssist Editorial Team",
    slug: "editorial-team",
    role: "Editorial Team",
    shortBio: "The editorial team at TheEduAssist covers practical guidance on learning strategy, instructional design, course development, and learning technology.",
    fullBio: "TheEduAssist Editorial Team manages content selection, research, and review to ensure practical and accurate guidance on learning strategy, instructional design, course development, LMS implementation, and enterprise learning. We combine subject-matter expertise with rigorous editorial standards to provide reliable insights for learning professionals.",
    profileImage: "/ui/theeduassist-logo-icon.png",
    profileImageAlt: "TheEduAssist Logo",
    areasOfExpertise: ["Learning Strategy", "Instructional Design", "Learning Technology"],
    organization: "TheEduAssist",
    publicVisibility: true,
    schemaType: "Organization",
    contentReviewRole: "Editorial Review"
  }
];
