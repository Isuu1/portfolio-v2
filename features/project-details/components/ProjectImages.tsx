import React from "react";
import Image from "next/image";

//Styles
import styles from "@/features/project-details/components/ProjectImages.module.scss";
//Animations
import { motion, type Variants } from "motion/react";
//Utils
import { urlFor } from "@/sanity/lib/image";
//Types
import { Project } from "@/shared/types/project";

const projectImagesVariants: Variants = {
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  hidden: {
    opacity: 0,
    x: -800,
  },
  exit: {
    opacity: 0,
    x: -800,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

interface ProjectImagesProps {
  project: Project;
}

const ProjectImages: React.FC<ProjectImagesProps> = ({ project }) => {
  return (
    <motion.div
      className={styles.projectImages}
      variants={projectImagesVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={styles.imagesWrapper}>
        {project?.images.map((image, index) => (
          <Image
            className={styles.image}
            key={index}
            src={urlFor(image).url()}
            alt=""
            fill
            priority
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectImages;
