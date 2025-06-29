// src/cli/commands/list.command.ts
import { Command, CommandRunner, Option } from 'nest-commander';
import axios from 'axios';

interface ListCommandOptions {
    id: number;
}

@Command({ name: 'list', description: 'Show a single product by ID' })
export class ListCommand extends CommandRunner {
    async run(passedParams: string[], options?: ListCommandOptions): Promise<void> {
        if (!options?.id) {
            console.error('You must specify the product ID with -i or --id');
            return;
        }
        try {
            const { data } = await axios.get(`http://localhost:8080/product/${options.id}`);
            console.table([data]);
        } catch (error: any) {
            console.error('Error:', error.response?.data || error.message);
        }
    }

    @Option({
        flags: '-i, --id <id>',
        description: 'ID of the product to list',
        required: true,
    })
    parseId(val: string): number {
        return Number(val);
    }
}
