"use client";

import React, { useState } from "react";
import { PortableText } from "next-sanity";
import Image from "next/image";

//Types
import { Project } from "@/shared/types/project";
//Styles
import styles from "@/features/projects/components/ProjectCard.module.scss";
//Utils
import { urlFor } from "@/sanity/lib/image";
//Animations
import { AnimatePresence, motion } from "motion/react";
import Button from "@/shared/components/ui/Button";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
}

export const projectCardVariants = {
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0.2,
    scale: 0,
    y: 70,
  },
  exit: {
    opacity: 0.2,
    y: 70,
    scale: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const projectDetailsVariants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const router = useRouter();

  const slicedTechnologies = project.technologies.slice(0, 4);

  return (
    <motion.div
      className={styles.projectCard}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
      variants={projectCardVariants}
      whileInView="visible"
      initial="hidden"
      exit="exit"
      layout
    >
      <AnimatePresence>
        {showDetails && (
          <motion.div
            className={styles.projectDetails}
            variants={projectDetailsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <h2 className={styles.name}>{project.name}</h2>
            <div className={styles.technologies}>
              {slicedTechnologies.map((tech, index) => (
                <div key={index}>
                  <em>#{tech}</em>
                </div>
              ))}
            </div>

            <div className={styles.short_description}>
              <PortableText value={project.short_description} />
            </div>

            <div className={styles.buttons}>
              <Button
                variant="secondary"
                text="View more"
                onClick={() => router.push(`/project/${project._id}`)}
              />
              <Button
                variant="primary"
                text="Live site"
                onClick={() => window.open(project.projectUrl, "_blank")}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        src={urlFor(project.thumbnail.asset.url).url()}
        alt={project.name}
        fill
        className={styles.image}
      />
    </motion.div>
  );
};

export default ProjectCard;
