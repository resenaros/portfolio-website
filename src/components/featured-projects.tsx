// src/components/featured-projects.tsx

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import { ProjectCard } from "@/app/(marketing)/projects/project-card";
import { projects } from "@/data/projects";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
};

export function FeaturedProjects() {
    const featured = projects.filter((p) => p.featured); 

    if (featured.length === 0) return null;

    return (
        <section className="space-y-6">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className='text-xl font-semibold tracking-tight'>
                        Featured Projects
                    </h2>
                    <p className='text-sm text-muted-foreground'>
                        A selection of my most notable projects.
                    </p>
                </div>
                <Link 
                    href="/projects"
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition hover:text-foreground"
                >
                    View All
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="flex justify-center"
                >
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        orientation="horizontal"
                        plugins={[
                            Autoplay({
                                delay: 3000,
                                stopOnInteraction: false,
                            }),
                        ]}
                        className="w-full max-w-xl"
                    >
                        <CarouselContent className="-ml-4 h-[500px]">
                            {featured.map((project) => (
                                <CarouselItem
                                    key={project.slug}
                                    className="pl-4 basis-full"
                                >
                                    <motion.div variants={cardVariants} className="h-full">
                                        <ProjectCard project={project} className="h-full" />
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="hidden sm:flex" />
                        <CarouselNext className="hidden sm:flex" />
                    </Carousel>
                </motion.div>
        </section>
    );
}
