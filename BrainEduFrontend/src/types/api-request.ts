export type NotificationRequest = {
    userId: number,
    title: string,
    content: string,
    type: "COURSE_UPDATE"|      
            "NEW_COMMENT"|        
            "ASSIGNMENT_SUBMITTED"| 
            "ASSIGNMENT_GRADED"|    
            "SYSTEM_ALERT"|      
            "PAYMENT_SUCCESS"|  
            "REMINDER"    
}