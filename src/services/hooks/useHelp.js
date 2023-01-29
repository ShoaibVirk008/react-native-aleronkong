import { useState } from "react"
import { order_statuses } from "../constants"

export default function UseHelp({order_status}) {
        const is_pending_order = order_status === order_statuses.pending
        const is_active_order = order_status === order_statuses.active
        const is_delivered_order = order_status === order_statuses.delivered
        const is_cancelRequested_order = order_status === order_statuses.cancelRequested
        const is_cancelled_order = order_status === order_statuses.cancelled
        const is_completed_order = order_status === order_statuses.completed

    return {
        is_pending_order,
        is_active_order,
        is_delivered_order,
        is_cancelRequested_order,
        is_cancelled_order,
        is_completed_order
    }
}