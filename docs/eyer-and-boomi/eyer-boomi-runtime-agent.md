---
sidebar_position: 2
---

# Eyer Boomi runtime agent

Eyer can monitor and process runtime information from the Atoms and Molecules. 

To enable JMX data for Eyer, we use Influx Telegraf in combination with Jolokia, to expose the runtime performance data to Eyer. The data we fetch from the runtime are the following (example, internal JSON format in Eyer):

```json
[{		
	system: "DESKTOP-S01F7CP",	
	nodes :{	
		nodetype: "operatingsystem",
		data:
		{
		cpu_usage_system: 1.4797507788161994,
		cpu_usage_user: 31.386292834890966
		TotalSystemMemUsed: 5312753664,
		AtomCommittedVirtualMemorySize: 327794688,
		HeapMemoryUsage.committed: 134217728,
		HeapMemoryUsage.init: 134217728,
		HeapMemoryUsage.max: 536870912,
		HeapMemoryUsage.used: 78256432,
		AtomProcessCpuLoad: 0.0028079687560744176,
		TotalPhysicalMemorySize: 8502923264,
		timestamp: 1697127400
		},
		nodetype: "ExecutionManager",
		data:
		{
		AverageExecutionQueueTime: 0,
		AverageExecutionTime: 0,
		LocalRunningWorkersCount: 0,
		MaxQueuedExecutions: 0,
		QueuedExecutionCount: 0,
		QueuedExecutionEstimatedCount: 0,
		QueuedExecutionTimeout: 0,
		RunningExecutionCount: 0,
		RunningExecutionEstimatedCount: 0,
		timestamp: 1697127400
		},
		nodetype: "ResourceManager",
		data:
		{
		AtomInBadState: false,
		DeadlockDetected: false,
		LowMemory: false,
		OutOfMemory: false,
		TooManyOpenFiles: false,
		timestamp: 1697127400
		},
		nodetype: "Scheduler",
		data:
		{
		ExecutingSchedulesCount: 0,
		MissedSchedulesCount: 0,
		ScheduleCount: 7,
		timestamp: 1697127400
		},
		nodetype: "ProcessSummaryReportingService",
		data:
		{
		PendingExecutionCount: 0,
		PendingReportCount: 0,
		PendingResultCount: 0,
		timestamp: 1697127400
		},
		nodetype: "MessageQueueFactory",
		data:
		{
		PendingMessageCount: 0,
		timestamp: 1697127400
		},
		nodetype: "config",
		data:
		{
		Restarting: false,
		Status: "RUNNING",
		timestamp: 1697127400
		},
		nodetype: "QueueAcknowledgement-track",
		data:
		{
		PendingStoreMessageCount: 0,
		PendingUploadMessageCount: 0,
		timestamp: 1697127400
		},
		nodetype: "MessagePollerThread",
		data:
		{
		connectFailureCount: 2,
		deliveredMessageCount: 0,
		timestamp: 1697127400
		}
	}	
}]		

```