import { Dialog, DialogContent, Button } from "@dallah/design-system";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { CompletionDialogProps } from "@lib/types/goals";
import { fadeInVariants, fadeInUpVariants } from "@components/aniamtion/animate";

export const CompletionDialog = ({ open, onOpenChange, onComplete }: CompletionDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[400px] p-0 overflow-hidden border-0">
                <motion.div className="relative bg-white rounded-xl" variants={fadeInVariants} initial="hidden" animate="visible">
                    <div className="p-2 pt-6">
                        <div className="flex flex-col items-center">
                            <motion.div variants={fadeInUpVariants} className="mb-6">
                                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                                    <svg
                                        className="w-8 h-8 text-emerald-500"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3">
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            d="M20 6L9 17L4 12"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                            </motion.div>
                            <motion.div variants={fadeInUpVariants} className="text-center space-y-2 mb-6">
                                <h2 className="text-xl font-semibold text-[#234d64]">
                                    All Set and Ready!
                                </h2>
                                <p className="text-gray-500 text-sm font-light">
                                    Your goals are locked in. Time to discover opportunities that match your aspirations.
                                </p>
                            </motion.div>

                            <Button onClick={onComplete} className="w-full bg-[#234d64] hover:bg-[#1a3b4d] text-white h-12 rounded-lg text-sm font-medium">
                                View Opportunities
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};