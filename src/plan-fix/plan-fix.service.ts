// import {BadRequestException, Injectable} from "@nestjs/common";
// import {Account, Acts, Bill, Contract, ContractType, Customer, CustomerCandidate, Settings, Task} from "@prisma/client";
// import {HttpService} from "@nestjs/axios";
// import {PrismaService} from "../prisma/prisma.service";
// import {TaskType} from "../common/types/taskType.enum";
// import {MailService} from "../mail/mail.service";
// import * as passwordGenerator from "generate-password";
// import {PdfService} from "../helpers/pdf.service";
// import {HashService} from "../helpers/hash.service";
// import {EdinService} from "../edin/edin.service";
// import {join} from "path";
// import {writeFile} from "fs/promises";
// import {IntegrationsService} from "../integrations/integrations.service";
// import {BillLineWithAccountSystem, BillsRepository} from "../bills/bills.repository";
// import {CustomersRepository} from "../customers/entities/customers.repository";
// import {RegionsRepository} from "../modules/regions/regions.repository";
//
// type TaskStatus = {
//     id: number;
//     name: string;
//     color: string;
//     isActive: boolean;
//     hasDeadline: boolean;
//     separated: boolean;
//     texts: [
//         {
//             lang: string;
//             name: string;
//         }
//     ];
// };
//
// export enum PlanFixStatus {
//     Fail = 128,
//     Completed = 3,
//     Process = 2,
//     Success = 6,
// }
//
// @Injectable()
// export class PlanFixService {
//     constructor(
//         private readonly httpService: HttpService,
//         private prisma: PrismaService,
//         private mailService: MailService,
//         private pdfService: PdfService,
//         private hashService: HashService,
//         private edinService: EdinService,
//         private integrationsService: IntegrationsService,
//         private customersRepository: CustomersRepository,
//         private billRepository: BillsRepository,
//         private settingsRepository: SettingsRepository,
//         private regionRepository: RegionsRepository
//     ) {
//     }
//
//     async createNewCustomerTask(
//         newCustomer: Customer,
//         managerId: string,
//         projectId: number
//     ) {
//         const regDataLink = `${process.env.FRONTEND_HOST}/customers/?editClient=${newCustomer.id}`;
//         const publicAgree = newCustomer.publicAgree;
//         return await this.createTask(
//             `Проверка регистрационных данных ${newCustomer.companyName}`,
//             managerId,
//             `Проверить регистрационные данные: ${regDataLink}.<br/> Клиент по ${
//                 publicAgree ? "публичномуу" : "уникальному"
//             } договору`,
//             newCustomer.planFixId,
//             projectId
//         );
//     }
//
//     async createPreSignUpTask(newCustomer: CustomerCandidate, link, publicAgree: boolean, projectId: number, managerId: string) {
//         return await this.createTask(
//             `Первичная регистрация ${newCustomer.companyName}`,
//             managerId,
//             `Регистрационные данные: ${link}<br /> Клиент по ${
//                 publicAgree ? "публичному" : "уникальному"} договору`,
//             0,
//             projectId
//         );
//     }
//
//     async createTopUpAccountTask(
//         companyName: string,
//         managerId: string,
//         documentName,
//         counterparty,
//         projectId: number
//     ): Promise<any> {
//         const billLink = `${process.env.FRONTEND_HOST}/download/?document=bills&name=${documentName}`;
//
//         return await this.createTask(
//             `Пополнение ${companyName}`,
//             managerId,
//             `Посмотреть счет в формате PDF: ${billLink}`,
//             counterparty,
//             projectId
//         );
//     }
//
//     async createExpensesMotherTask(
//         companyName: string,
//         managerId: string,
//         counterparty: number,
//         projectId: number,
//         documentName: string
//     ) {
//         const billLink = `${process.env.FRONTEND_HOST}/download/?document=bills&name=${documentName}`;
//         return await this.createTask(
//             `Пополнение ${companyName}`,
//             managerId,
//             `Посмотреть счет в формате PDF: ${billLink}`,
//             counterparty,
//             projectId
//         );
//     }
//
//     async createPostPayMotherTask(companyName: string,
//                                   managerId: string,
//                                   counterparty: number,
//                                   projectId: number,
//                                   documentName: string) {
//         const billLink = `${process.env.FRONTEND_HOST}/download/?document=bills&name=${documentName}`;
//         return await this.createTask(
//             `Пополнение постоплата ${companyName}`,
//             managerId,
//             `Посмотреть счет в формате PDF: ${billLink}`,
//             counterparty,
//             projectId
//         );
//     }
//
//     async createCheckPaymentTask(
//         companyName: string,
//         managerId: string,
//         billNumber: number | string,
//         counterparty: number,
//         parentTaskId: number,
//         projectId: number,
//         isPaid: boolean
//     ) {
//         const name = isPaid
//             ? `Проверка оплаты №${billNumber} ${companyName}`
//             : `Не оплачена проверка оплаты №${billNumber} ${companyName}`;
//         return await this.createTask(
//             name,
//             managerId,
//             "",
//             counterparty,
//             projectId,
//             parentTaskId
//         );
//     }
//
//     async createTransferTask(
//         companyName: string,
//         managerId: string,
//         counterparty: number,
//         projectId: number,
//         fromAccount: Account,
//         fromSystem: string,
//         toAccount: Account,
//         toSystem: string,
//         sum: string
//     ) {
//         return await this.createTask(
//             `Перенос средств ${companyName}`,
//             managerId,
//             `Запрос на перенос средств из ${fromSystem} - ${fromAccount.accountName} в ${toSystem} - ${toAccount.accountName}
//       в размере ${sum} от ${companyName}`,
//             counterparty,
//             projectId
//         );
//     }
//
//     async createByeTransferTask(
//         companyName: string,
//         managerId: string,
//         counterparty: number,
//         projectId: number,
//         fromAccount: Account,
//         fromSystem: string,
//         toAccount: Account,
//         toSystem: string,
//         sum: string
//     ) {
//         return await this.createTask(
//             `Покупка валюты / перенос средств ${companyName}`,
//             managerId,
//             `Запрос на перенос средств из ${fromSystem} - ${fromAccount.accountName} в ${toSystem} - ${toAccount.accountName}
//       в размере ${sum} от ${companyName} `,
//             counterparty,
//             projectId
//         );
//     }
//
//     async createCounterpartyIdTask(
//         customer: Customer,
//         managerId: string,
//         projectId
//     ) {
//         const link = `${process.env.FRONTEND_HOST}/customers/?editClient=${customer.id}&tab=accountData`;
//         const {publicAgree} = customer;
//
//         return await this.createTask(
//             `ID контрагента ${customer.companyName}`,
//             managerId,
//             `Проверить наличие контрагента в PlanFix, добавить числовое значение ID и создать договор для клиента в административной панели: ${link}.<br/>
//         Клиент по ${publicAgree ? "публичному" : "уникальному"} договору`,
//             customer.planFixId,
//             projectId
//         );
//     }
//
//     async createCurrencyTask(
//         billNumber: number | string,
//         customer: Customer,
//         managerId: string,
//         projectId
//     ) {
//         return await this.createTask(
//             `Покупка валюты №${billNumber} ${customer.companyName}`,
//             managerId,
//             "",
//             customer.planFixId,
//             projectId
//         );
//     }
//
//     async createCurrencyPostPayTask(billNumber: number | string,
//                                     customer: Customer,
//                                     managerId: string,
//                                     projectId,
//                                     task: Task) {
//         return await this.createTask(
//             `Покупка валюты постоплата №${billNumber} ${customer.companyName}`,
//             managerId,
//             "",
//             customer.planFixId,
//             projectId,
//             task.id
//         );
//     }
//
//     async createNewAccountTask(
//         customerCompanyName,
//         customerPlanFixId,
//         account: Account,
//         systemName: string,
//         managerId: string,
//         projectId
//     ) {
//         const link = `${process.env.FRONTEND_HOST}/customers/?activateAccount=${account.id}`;
//         const emailType = systemName === "MyTarget" ? "VK Ads ID" : "Email";
//         return await this.createTask(
//             `Создание ${systemName} ${customerCompanyName}`,
//             managerId,
//             `Ввести данные аккаунта клиента: ${link}<br/>
//            ${emailType}: ${account.email ? account.email : "-"}<br/>
//            Наименование: ${account.accountName}<br/>
//            Сайт для продвижения: ${account.site}<br/>
//         `,
//             customerPlanFixId,
//             projectId
//         );
//     }
//
//     async createUpdateBillTask(
//         billNumber: number | string,
//         customer: Customer,
//         managerId: string,
//         projectId
//     ) {
//         return await this.createTask(
//             `Изменение счета №${billNumber} ${customer.companyName}`,
//             managerId,
//             "",
//             customer.planFixId,
//             projectId
//         );
//     }
//
//     private async createTask(
//         name: string,
//         managerId: string,
//         description: string,
//         counterparty: number,
//         projectId: number,
//         parentTaskId?: number
//     ) {
//         const headersRequest = {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${process.env.PLAN_FIX_API_TOKEN}`
//         };
//         let data = {
//             template: {id: parseInt(process.env.PF_TASK_TEMPLATE)},
//             name,
//             description,
//             status: {id: 2},
//             assigner: {id: process.env.PLAN_FIX_TYPE + managerId},
//             assignees: {users: [{id: process.env.PLAN_FIX_TYPE + managerId}]},
//             counterparty: {id: process.env.PLAN_FIX_TYPE + counterparty},
//             project: {
//                 id: projectId
//             }
//         };
//         //@ts-ignore
//         if (parentTaskId) data.parent = {id: parentTaskId};
//         console.log("Create Task", data, headersRequest);
//
//         return this.httpService.axiosRef.post(
//             "https://wunder-digital.planfix.ru/rest/task/",
//             data,
//             {headers: headersRequest}
//         );
//     }
//
//
//     async getTask(id: string) {
//         try {
//
//             const headersRequest = {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${process.env.PLAN_FIX_API_TOKEN}`
//             };
//             const t = await this.httpService.axiosRef.get(
//                 `https://wunder-digital.planfix.ru/rest/task/${id}?fields=status,assigner,counterparty,project,parent`,
//                 {headers: headersRequest}
//             );
//             console.log('REMOTE', t);
//
//             return t;
//         } catch (e) {
//             console.log(e.data);
//             return null;
//         }
//
//     }
//
//     async closeTask(data: {
//         id: number;
//         status: TaskStatus;
//         project: { id: number };
//     }) {
//         console.log("Task close", data);
//         let task = await this.prisma.task.findUnique({
//             where: {id: data.id}
//         });
//         console.log("Founded task ", task);
//         if (!task) return true;
//         switch (task.type) {
//             case TaskType.NEW_CUSTOMER:
//                 await this.closeNewCustomerTask(task, data.status.id, data);
//                 break;
//             case TaskType.COUNTERPARTY_ID:
//                 await this.closeCounterpartyIdTask(task, data.status.id);
//                 break;
//             case TaskType.PAYMENT_WAITING:
//                 await this.closePaymentWaitingTask(task, data.status.id, data);
//                 break;
//             case TaskType.CHECK_PAYMENT_NO_PAID:
//                 await this.closeNoPaidTask(task, data.status.id);
//                 break;
//             case TaskType.CHECK_PAYMENT_PAID:
//                 await this.closePaidTask(task, data.status.id);
//                 break;
//             case TaskType.TOP_UP_ACCOUNTS:
//                 await this.closeTopUpAccountTask(task, data.status.id);
//                 break;
//             case TaskType.NEW_ACCOUNT:
//                 await this.closeNewAccountTask(task, data.status.id);
//                 break;
//             case TaskType.ONE_ACCOUNT_TOP_UP:
//                 await this.closeOneAccountTopUpTask(task, data.status.id);
//                 break;
//             case TaskType.TRANSFER_ACCOUNTS:
//                 await this.closeTransferTask(task, data.status.id);
//                 break;
//             case TaskType.PAYMENT_WAITING_EXPENSES:
//                 await this.closePaymentWaitingExpensesTask(task, data.status.id);
//                 break;
//             case TaskType.PAYMENT_WAITING_EXPENSES_PAID:
//                 await this.closePaidExpensesTask(task, data.status.id);
//                 break;
//             case TaskType.PAYMENT_WAITING_EXPENSES_NO_PAID:
//                 await this.closeUnPaidExpensesTask(task, data.status.id);
//                 break;
//             default:
//                 console.log("unknown task type");
//         }
//     }
//
//     private async closeNewCustomerTask(task: any, statusId: number, data: any) {
//         const counterparty = await this.prisma.customer.findUnique({
//             where: {id: task.customerId},
//             include: {
//                 contracts: {
//                     include: {
//                         settings: true
//                     }
//                 }
//             }
//         });
//         const managerId = data.assigner.id.split(":")[1];
//         console.log("Close new customer task", statusId);
//         if (statusId === PlanFixStatus.Fail) {
//             await this.mailService.sendRegistrationFail(
//                 counterparty.contactEmail,
//                 counterparty.companyName,
//             );
//         } else if (statusId === PlanFixStatus.Completed) {
//             console.log("Completed");
//             const newTaskId = (
//                 await this.createCounterpartyIdTask(
//                     counterparty,
//                     managerId,
//                     data.project.id
//                 )
//             ).data.id;
//             await this.prisma.task.create({
//                 data: {
//                     id: newTaskId,
//                     counterparty: {
//                         connect: {id: counterparty.id}
//                     },
//                     type: TaskType.COUNTERPARTY_ID,
//                     managerId: task.managerId
//                 }
//             });
//         }
//     }
//
//     private async getCustomer(where) {
//         return this.prisma.customer.findUnique({
//             where,
//             include: {
//                 contracts: {
//                     where: {
//                         isActive: true
//                     },
//                     include: {
//                         settings: true,
//                         systemSettings: {
//                             include: {
//                                 lines: true
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//     }
//
//     async closePaymentWaitingExpensesTask(
//         task: Task,
//         statusId: number
//     ) {
//         if (statusId === PlanFixStatus.Completed) {
//             const customer = await this.customersRepository.customer<Customer>({where: {id: task.customerId}});
//             const globalSettings = await this.settingsRepository.globalSettings();
//             const bill = await this.billRepository.bill({where: {id: task.billId}});
//             const contract = await this.prisma.contract.findUnique({
//                 where: {id: bill.contractId},
//                 include: {settings: true}
//             })
//             const paymentTask = await this.createCheckPaymentTask(
//                 customer.companyName,
//                 globalSettings.planFixManagerId,
//                 bill.number,
//                 customer.planFixId,
//                 task.id,
//                 contract.settings.projectId,
//                 true
//             );
//
//             await this.prisma.task.create({
//                 data: {
//                     id: paymentTask.data.id,
//                     counterparty: {
//                         connect: {
//                             id: customer.id
//                         }
//                     },
//                     billId: bill.id,
//                     type: TaskType.PAYMENT_WAITING_EXPENSES_PAID,
//                     managerId: task.managerId,
//                     parentId: task.id
//                 }
//             });
//         }
//     }
//
//     async closePaidExpensesTask(task: Task,
//                                 statusId: number) {
//         if (statusId === PlanFixStatus.Completed) {
//             this.closeExpensesPaidTask(task);
//         }
//     }
//
//     async topUpSubTasksPostPay(bill: Bill, customer: Customer, task: Task, settings: Settings) {
//         const billLines = await this.billRepository.billLines({
//             where: {billId: bill.id},
//             include: {account: true}
//         });
//         const currencyLink = `${process.env.FRONTEND_HOST}/customers?set_currency=true&bill=${bill.id}&customer=${customer.id}`;
//         const actsLink = `${process.env.FRONTEND_HOST}/customers?set_act=true&bill=${bill.id}&customer=${customer.id}`;
//         const billLink = `${process.env.FRONTEND_HOST}/download/?document=bills&name=${bill.link}`;
//         for (const line of billLines) {
//             const taskId = await this.createTask(
//                 `Пополнение ${line.account.accountName} ${customer.companyName}`,
//                 task.managerId,
//                 `Посмотреть счет в формате PDF: ${billLink}<br/>
//                 Установить курс покупки валюты: ${currencyLink}<br/>
//                 Прикрепить оригиналы актов: ${actsLink}`,
//                 customer.planFixId,
//                 settings.projectId,
//                 task.id
//             );
//             const createdSubTask = await this.prisma.task.create({
//                 data: {
//                     id: taskId.data.id,
//                     counterparty: {
//                         connect: {id: bill.customerId}
//                     },
//                     type: TaskType.ONE_ACCOUNT_TOP_UP,
//                     managerId: task.managerId,
//                     billId: bill.id,
//                     parentId: task.parentId
//                 }
//             });
//             console.log("Created task ONE_ACCOUNT_TOP_UP for postpay ", createdSubTask.id);
//         }
//     }
//
//     async closeExpensesPaidTask(task: Task) {
//         try {
//             const customer = await this.customersRepository.customer<Customer>({where: {id: task.customerId}});
//             const bill = await this.billRepository.bill({where: {id: task.billId}});
//             const billLines = await this.billRepository.billLines({
//                 where: {billId: bill.id}, include: {
//                     account: true
//                 }
//             });
//             const billLink = `${process.env.FRONTEND_HOST}/download/?document=bills&name=${bill.link}`;
//             const settings = await this.settingsRepository.settings({
//                 where: {
//                     contractId: bill.contractId
//                 }
//             });
//             console.log("settings", settings);
//             const currencyTask = await this.createTask(
//                 `Покупка валюты ${customer.accountNumber} ${customer.companyName}`,
//                 task.managerId,
//                 `Посмотреть счет в формате PDF: ${billLink}`,
//                 customer.planFixId,
//                 settings[0].projectId
//             );
//
//             const currencyLink = `${process.env.FRONTEND_HOST}/customers?set_currency=true&bill=${bill.id}&customer=${customer.id}`;
//             const actsLink = `${process.env.FRONTEND_HOST}/customers?set_act=true&bill=${bill.id}&customer=${customer.id}`;
//
//             for (const line of billLines) {
//                 const taskId = await this.createTask(
//                     `Пополнение ${line.account.accountName} ${customer.companyName}`,
//                     task.managerId,
//                     `Посмотреть счет в формате PDF: ${billLink}<br/>
//                     Установить курс покупки валюты: ${currencyLink}<br/>
//                     Прикрепить оригиналы актов: ${actsLink}`,
//                     customer.planFixId,
//                     settings[0].projectId,
//                     task.parentId
//                 );
//                 await this.prisma.task.create({
//                     data: {
//                         id: taskId.data.id,
//                         counterparty: {
//                             connect: {id: bill.customerId}
//                         },
//                         billId: bill.id,
//                         type: TaskType.ONE_ACCOUNT_TOP_UP,
//                         managerId: task.managerId,
//                         parentId: task.parentId
//                     }
//                 });
//             }
//         } catch (e) {
//             console.log('Error on closeExpensesPaidTask', e)
//         }
//     }
//
//     async closeUnPaidExpensesTask(task: Task,
//                                   statusId: number) {
//         if (statusId === PlanFixStatus.Completed) {
//             this.closeExpensesPaidTask(task);
//         } else if (statusId === PlanFixStatus.Fail) {
//             const customer = await this.customersRepository.customer<Customer>({where: {id: task.customerId}});
//             const bill = await this.billRepository.bill({where: {id: task.billId}});
//             await this.cancelBill(customer, bill);
//         }
//     }
//
//     async cancelBill(customer: Customer, bill: Bill) {
//         await this.prisma.bill.update({
//             where: {id: bill.id},
//             data: {
//                 isActive: false
//             }
//         });
//         let text = ``;
//         const billLines = await this.billRepository.billLines({
//             where: {billId: bill.id}, include: {
//                 account: {
//                     include: {
//                         system: true
//                     }
//                 }
//             }
//         });
//         const systemNames = billLines.map(
//             (line) => line.account.system.name
//         );
//         if (systemNames.length === 1) text = `в системе ${systemNames[0]}`;
//         if (systemNames.length)
//             text = `в системах ${systemNames.join(", ")}`;
//         await this.mailService.sendBillCanceled(
//             customer.contactEmail,
//             customer.contactName,
//             text
//         );
//     }
//
//     async closePaymentWaitingExpensesNoPaidTask(bill: Bill, contract: Contract, task: Task, customer: Customer) {
//         // const settings = await this.settingsRepository.setting({where: {id: contract.settingsId}});
//         // const taskId = await this.createTask(
//         //     `Не оплачена проверка оплаты №${bill.number} ${customer.companyName}`,
//         //     task.managerId,
//         //     ``,
//         //     customer.planFixId,
//         //     settings.projectId,
//         //     task.id
//         // );
//         // await this.prisma.task.create({
//         //     data: {
//         //         id: taskId.data.id,
//         //         counterparty: {
//         //             connect: {
//         //                 id: customer.id
//         //             }
//         //         },
//         //         type: TaskType.PAYMENT_WAITING_EXPENSES_NO_PAID,
//         //         managerId: task.managerId,
//         //         parentId: task.id
//         //     }
//         // });
//     }
//
//     private async closePaymentWaitingTask(
//         task: any,
//         statusId: number,
//         data: any
//     ) {
//         if (statusId === PlanFixStatus.Completed) {
//             //  Executed
//             const customer = await this.getCustomer({id: task.customerId});
//             const bill = await this.prisma.bill.findUnique({
//                 where: {taskId: data.parent.id},
//                 include: {
//                     lines: {
//                         include: {
//                             account: {
//                                 include: {
//                                     system: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//             const settings = customer.contracts[0].settings;
//             const billLink = `${process.env.FRONTEND_HOST}/download/?document=bills&name=${bill.link}`;
//
//             const tasks = await this.createTask(
//                 `Покупка валюты ${customer.accountNumber} ${customer.companyName}`,
//                 task.managerId,
//                 `Посмотреть счет в формате PDF: ${billLink}`,
//                 customer.planFixId,
//                 settings.projectId
//             );
//             console.log("Покупка валюты ", tasks.data);
//
//             const currencyLink = `${process.env.FRONTEND_HOST}/customers?set_currency=true&bill=${bill.id}&customer=${customer.id}`;
//             const actsLink = `${process.env.FRONTEND_HOST}/customers?set_act=true&bill=${bill.id}&customer=${customer.id}`;
//             if (Array.isArray(bill.lines)) {
//                 for (const line of bill.lines) {
//                     const taskId = await this.createTask(
//                         `Пополнение ${line.account.accountName} ${customer.companyName}`,
//                         task.managerId,
//                         `Посмотреть счет в формате PDF: ${billLink}<br/>
//                 Установить курс покупки валюты: ${currencyLink}<br/>
//                 Прикрепить оригиналы актов: ${actsLink}`,
//                         customer.planFixId,
//                         settings.projectId,
//                         task.parentId
//                     );
//                     await this.prisma.task.create({
//                         data: {
//                             id: taskId.data.id,
//                             counterparty: {
//                                 connect: {id: bill.customerId}
//                             },
//                             type: TaskType.ONE_ACCOUNT_TOP_UP,
//                             managerId: task.managerId,
//                             billId: bill.id,
//                             parentId: task.parentId
//                         }
//                     });
//                 }
//             }
//
//             const region = await this.regionRepository.activeRegion()
//             const contacts = await this.regionRepository.regionContact(region.id)
//             const contract = customer.contracts[0];
//
//             this.createAct(bill, contacts, customer, contract, region, task.parentId);
//         } else if (statusId === PlanFixStatus.Fail) {
//             const counterparty = await this.prisma.customer.findUnique({
//                 where: {id: task.customerId},
//                 include: {settings: true}
//             });
//             const bill = await this.prisma.bill.findFirst({
//                 where: {taskId: data.parent.id},
//                 include: {
//                     lines: {
//                         include: {
//                             account: {
//                                 include: {
//                                     system: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//             await this.prisma.bill.update({
//                 where: {id: bill.id},
//                 data: {
//                     isActive: false
//                 }
//             });
//             let text = ``;
//             const systemNames = bill.lines.map(
//                 (line) => line.account.system.name
//             );
//             if (systemNames.length === 1) text = `в системе ${systemNames[0]}`;
//             if (systemNames.length)
//                 text = `в системах ${systemNames.join(", ")}`;
//             await this.mailService.sendBillCanceled(
//                 counterparty.contactEmail,
//                 counterparty.contactName,
//                 text
//             );
//         }
//     }
//
//     private async closeNoPaidTask(task: any, statusId: number) {
//         if (statusId === PlanFixStatus.Completed) {
//             //success
//             await this.createTasksForEachPayment(task);
//         } else if (statusId === PlanFixStatus.Fail) {
//             const counterparty = await this.prisma.customer.findUnique({
//                 where: {id: task.customerId},
//                 include: {settings: true}
//             });
//             await this.mailService.sendPaymentFail(
//                 counterparty.contactEmail,
//                 counterparty.contactName,
//             );
//         }
//     }
//
//     private async closePaidTask(task: any, statusId: number) {
//         if (statusId === PlanFixStatus.Fail) {
//             //failure
//             await this.prisma.paymentWaiting.update({
//                 where: {taskId: task.id},
//                 data: {isActive: true}
//             });
//         } else if (statusId === PlanFixStatus.Completed) {
//             await this.createTasksForEachPayment(task);
//         }
//     }
//
//     private async createTasksForEachPayment(task: any) {
//         const bill = await this.prisma.bill.findUnique({
//             where: {taskId: task.id},
//             include: {
//                 lines: {include: {account: {include: {system: true}}}},
//                 customer: {
//                     include: {
//                         contracts: {
//                             select: {
//                                 settings: true,
//                                 isActive: true
//                             }
//                         },
//                     }
//                 }
//             }
//         });
//         const contract = bill.customer.contracts.find((c) => c.isActive);
//         const billLink = `${process.env.FRONTEND_HOST}/download/?document=bills&name=${bill.link}`;
//         const regionSettings = await this.settingsRepository.globalSettings()
//
//         console.log(bill);
//         console.log("bill");
//         for (let i = 0; i < bill.lines.length; i++) {
//             await this.createTask(
//                 `Пополнение ${bill.lines[i].account.system.name} ${bill.customer.companyName}`,
//                 regionSettings.planFixManagerId,
//                 `Посмотреть счет в формате PDF: ${billLink}`,
//                 bill.customer.planFixId,
//                 contract.settings.projectId,
//                 task.id
//             );
//         }
//
//         const currencyTask = await this.createCurrencyTask(
//             bill.number,
//             bill.customer,
//             regionSettings.financialManagerId,
//             contract.settings.projectId
//         );
//         await this.prisma.task.create({
//             data: {
//                 id: currencyTask.data.id,
//                 counterparty: {
//                     connect: {id: bill.customerId}
//                 },
//                 type: TaskType.BYE_CURRENCY_TASK,
//                 managerId: regionSettings.planFixManagerId
//             }
//         });
//     }
//
//     private async closeTopUpAccountTask(task: any, statusId: number) {
//         if (statusId === PlanFixStatus.Completed) {
//             const customer = await this.prisma.customer.findFirst({
//                 where: {id: task.customerId}
//             });
//             const bill = await this.prisma.bill.findFirst({
//                 where: {taskId: task.id},
//                 include: {
//                     contract: {
//                         include: {
//                             settings: true
//                         }
//                     },
//                     lines: {
//                         include: {
//                             account: {
//                                 include: {
//                                     system: true
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//             const contract = bill.contract;
//             const settings = contract.settings;
//
//             const act = await this.prisma.acts.findFirst({
//                 where: {billId: bill.id}
//             });
//
//             const actLink = `${process.env.FRONTEND_HOST}/download/?document=acts&name=${act.link}`;
//
//             this.mailService.sendActMail(
//                 customer.companyEmail,
//                 actLink
//             );
//             this.mailService.sendActMail(
//                 customer.contactEmail,
//                 actLink
//             );
//             console.log("EDN", settings.isEDNActive);
//             if (settings.isEDNActive) {
//                 await this.startDocumentSign(act, task.id);
//             } else {
//                 await this.prisma.acts.update({
//                     where: {id: act.id},
//                     data: {
//                         closed: true,
//                         isVisible: true
//                     }
//                 });
//             }
//
//         }
//     }
//
//     private async createAct(bill, contacts, customer, contract, region, taskId: number) {
//         const {total, sum, link} =
//             await this.pdfService.generateClosureDocument({
//                 bill,
//                 contacts,
//                 customer,
//                 contract,
//                 sign: region.sign,
//                 regionName: region.name
//             });
//         const settings = contract.settings;
//         let isSigned = false;
//         if (contract.contractType === ContractType.STANDARD) isSigned = true;
//
//         console.log("Closere document", link);
//         const act = await this.prisma.acts.create({
//             data: {
//                 link,
//                 total,
//                 sum,
//                 bill: {
//                     connect: {
//                         id: bill.id
//                     }
//                 },
//                 closed: false,
//                 isSigned,
//                 contract: {connect: {id: contract.id}},
//                 customer: {
//                     connect: {
//                         id: customer.id
//                     }
//                 }
//             }
//         });
//     }
//
//     private async startDocumentSign(act: Acts, taskId: number) {
//         try {
//             const keys = await this.edinService.getKeys();
//             if (keys.find(k => k.sessionOpened)) {
//                 const content = await this.edinService.readFileAndSign(join("acts", act.link));
//                 if (typeof content === "string") {
//                     const pathname = join(process.cwd(), "edin", act.link);
//                     await writeFile(pathname, content, "base64");
//                     const signedDocument = await this.prisma.signedDocuments.create({
//                         data: {
//                             act: {connect: {id: act.id}},
//                             customerId: act.customerId,
//                             status: "SIGNED",
//                             fileLink: act.link,
//                             task: {connect: {id: taskId}}
//                         }
//                     });
//                     await this.prisma.acts.update({
//                         where: {
//                             id: act.id
//                         }, data: {
//                             isSigned: true,
//                             closed: true,
//                             signedDocument: {connect: {id: signedDocument.id}}
//                         }
//                     });
//                 } else throw content;
//             } else throw new BadRequestException("NO_ACTIVE_KEYS");
//         } catch (e) {
//             console.log("CUSTOMER ERROR");
//             await this.prisma.signedDocuments.create({
//                 data: {
//                     act: {connect: {id: act.id}},
//                     customerId: act.customerId,
//                     status: "WAITING",
//                     fileLink: act.link,
//                     task: {connect: {id: taskId}}
//                 }
//             });
//         }
//     }
//
//
//     private async closeCounterpartyIdTask(task: any, statusId: number) {
//         const counterparty = await this.prisma.customer.findUnique({
//             where: {id: task.customerId},
//             include: {settings: true}
//         });
//
//         const user = await this.prisma.user.findUnique({
//             where: {id: counterparty.userId}
//         });
//
//         if (!user.secret && !counterparty.isActive) {
//             if (statusId === PlanFixStatus.Fail) {
//                 // task failure
//                 await this.mailService.sendRegistrationFail(
//                     counterparty.contactEmail,
//                     counterparty.companyName,
//                 );
//             } else if (statusId === PlanFixStatus.Completed) {
//                 const password = passwordGenerator.generate({
//                     length: 10,
//                     numbers: true
//                 });
//                 const secret = await this.hashService.hashData(password);
//                 const user = await this.prisma.user.update({
//                     where: {id: counterparty.userId},
//                     data: {secret}
//                 });
//                 const activeCustomer = await this.prisma.customer.update({
//                     where: {id: counterparty.id},
//                     data: {isActive: true}
//                 });
//                 await this.mailService.sendCustomerConfirmation(
//                     counterparty.contactEmail,
//                     counterparty.contactName,
//                     password,
//                     counterparty.companyEmail
//                 );
//             }
//         }
//     }
//
//
//     private async closeTransferTask(task: any, statusId: number) {
//         const counterparty = await this.prisma.customer.findUnique({
//             where: {id: task.customerId},
//             include: {settings: true}
//         });
//
//         if (statusId === PlanFixStatus.Fail) {
//             await this.mailService.sendTransferFail(
//                 counterparty.contactEmail,
//                 counterparty.contactName,
//             );
//         } else if (statusId === PlanFixStatus.Completed) {
//             await this.mailService.sendTransferSuccess(
//                 counterparty.contactEmail,
//                 counterparty.contactName,
//             );
//         }
//     }
//
//     private async closeOneAccountTopUpTask(task: any, statusId: number) {
//         if (statusId === PlanFixStatus.Completed) {
//             const bill = await this.prisma.bill.findUnique({
//                 where: {id: task.billId},
//                 include: {
//                     customer: {
//                         include: {
//                             contracts: {
//                                 where: {isActive: true},
//                                 include: {settings: true}
//                             },
//                         }
//                     }
//                 }
//             });
//             const billLines = await this.billRepository.billLines({
//                 where: {billId: bill.id}, include: {
//                     account: {
//                         include: {
//                             system: true
//                         }
//                     }
//                 }
//             });
//             for (const line of billLines) {
//                 const {account} = line;
//                 let balance: any = {balance: account.balance};
//                 switch (account.system.name) {
//                     case "Google Ads":
//                         balance = await this.integrationsService.getGoogleAdsBalance(account.externalAgency, account.externalClientId, account.externalAccountId);
//                         break;
//                     case "Яндекс Директ":
//                         balance = await this.integrationsService.getYandexDirectBalance(account.externalRegion, account.login, account.externalAccountId);
//                         break;
//                     case "TikTok":
//                         balance = await this.integrationsService.getTikTokBalance(account.externalRegion, account.externalClientId);
//                         break;
//                     case "Facebook":
//                         balance = await this.integrationsService.getMetaBalance(account.externalClientId);
//                         break;
//                     case "MyTarget":
//                         balance = await this.integrationsService.getMyTargetBalance(account.externalClientId);
//                         break;
//                 }
//                 console.log(balance);
//                 await this.prisma.account.update({
//                     where: {id: account.id},
//                     data: {balance: parseFloat(balance.balance)}
//                 });
//             }
//         } else if (statusId === PlanFixStatus.Fail) {
//             const bill = await this.prisma.bill.findUnique({
//                 where: {id: task.billId},
//                 include: {
//                     contract: {
//                         include: {
//                             settings: true
//                         }
//                     },
//                     customer: true
//                 }
//             });
//             // FOR POSTPAY
//             if (bill.type === "postpay") {
//                 this.cancelBill(bill.customer, bill);
//             } else {
//                 const regionSettings = await this.settingsRepository.globalSettings()
//                 const {contract} = bill;
//
//                 const updateBillTask = await this.createUpdateBillTask(
//                     bill.number,
//                     bill.customer,
//                     regionSettings.planFixManagerId,
//                     contract.settings.projectId
//                 );
//                 await this.prisma.task.create({
//                     data: {
//                         id: updateBillTask.data.id,
//                         counterparty: {
//                             connect: {id: bill.customerId}
//                         },
//                         billId: bill.id,
//                         type: TaskType.UPDATE_BILL,
//                         managerId: regionSettings.planFixManagerId
//                     }
//                 });
//             }
//
//         }
//     }
// }
