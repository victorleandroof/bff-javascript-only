#!/bin/bash
minCoverage=90
linesCoverageServer=$(jq -r '.total.lines.pct | tonumber | floor' .ci/reports/server/coverage-summary.json)
statementsCoverageServer=$(jq -r '.total.statements.pct | tonumber | floor' .ci/reports/server/coverage-summary.json)
functionsCoverageServer=$(jq -r '.total.functions.pct | tonumber | floor' .ci/reports/server/coverage-summary.json)
linesCoverageClient=$(jq -r '.total.lines.pct | tonumber | floor' .ci/reports/client/coverage-summary.json)
statementsCoverageClient=$(jq -r '.total.statements.pct | tonumber | floor' .ci/reports/client/coverage-summary.json)
functionsCoverageClient=$(jq -r '.total.functions.pct | tonumber | floor' .ci/reports/client/coverage-summary.json)



###### QUALIT GATE SERVER ######

if [ $linesCoverageServer -lt $minCoverage ] 
then
   echo "server: lines coverage ${linesCoverageServer} is less than ${minCoverage}"
   exit 1;
fi

if [ $statementsCoverageServer -lt $minCoverage ] 
then
   echo "server: statements coverage ${statementsCoverageServer} is less than ${minCoverage}"
   exit 1;
fi

if [ $functionsCoverageServer -lt $minCoverage ] 
then
   echo "server: statements coverage ${functionsCoverageServer} is less than ${minCoverage}"
   exit 1;
fi


###### QUALIT GATE CLIENT ######

if [ $linesCoverageClient -lt $minCoverage ] 
then
   echo "server: lines coverage ${linesCoverageClient} is less than ${minCoverage}"
   exit 1;
fi

if [ $statementsCoverageClient -lt $minCoverage ] 
then
   echo "server: statements coverage ${statementsCoverageClient} is less than ${minCoverage}"
   exit 1;
fi

if [ $functionsCoverageClient -lt $minCoverage ] 
then
   echo "server: statements coverage ${functionsCoverageClient} is less than ${minCoverage}"
   exit 1;
fi
