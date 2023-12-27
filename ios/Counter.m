//
//  Counter.m
//  MyTestApp
//
//  Created by Ted.Wen on 2023/12/27.
//

#import <Foundation/Foundation.h>

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(Counter,RCTEventEmitter)

RCT_EXTERN_METHOD(increment:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(decrement:
    (RCTPromiseResolveBlock)resolve
    reject:(RCTPromiseRejectBlock)reject)

@end